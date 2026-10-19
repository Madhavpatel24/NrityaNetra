"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AlertCircle, Camera, Check, ChevronDown, Loader2, Sparkles, Square, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { MudraGuide } from "@/components/mudra/guide"
import { TierBadge } from "@/components/mudra/tier-badge"
import { TIERS, mudraOf, tierOf } from "@/lib/mudra/guide"
import type { HandLandmarker } from "@mediapipe/tasks-vision"
import { createHandLandmarker } from "@/lib/mudra/hand-landmarker"
import { loadClassifier, type TreeClassifier } from "@/lib/mudra/classifier"
import { computeFeatures } from "@/lib/mudra/features"
import { PredictionSmoother } from "@/lib/mudra/smoother"

// "device": hand detection and classification run in the browser (fast, no
// server round trip). "realtime": frames are sent to the server (fallback).
type Mode = "device" | "realtime" | "image"

export default function MudraPredictPage() {
  const [mode, setMode] = useState<Mode>("device")
  const [running, setRunning] = useState(false)
  const [connected, setConnected] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [result, setResult] = useState<{
    label: string | null
    confidence: number
    error?: string
  } | null>(null)
  const [predicting, setPredicting] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  // realtime-only: the raw, frame-by-frame guess (flickers) vs. the
  // stabilized guess the backend only sets once it's held consistently
  // across several frames
  const [liveGuess, setLiveGuess] = useState<{
    label: string | null
    confidence: number
  } | null>(null)
  const [confirmedResult, setConfirmedResult] = useState<{
    label: string
    confidence: number
  } | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const userStoppedRef = useRef(true)

  // on-device mode
  const [deviceReady, setDeviceReady] = useState(false)
  const [deviceError, setDeviceError] = useState<string | null>(null)
  const [deviceStats, setDeviceStats] = useState<{
    fps: number
    delegate: "GPU" | "CPU"
  } | null>(null)
  const deviceActiveRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)

  /* ===============================
     REALTIME LOGIC
  =============================== */

  // The socket can drop (free-tier server cold start, network blip). That
  // should not turn the camera off, so on an unexpected close we keep the
  // camera running and reconnect; only the Stop button ends the session.
  const connectWs = () => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("✅ WS connected")
      setConnected(true)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setLiveGuess({ label: data.label, confidence: data.confidence ?? 0 })
      if (data.confirmed_label) {
        setConfirmedResult({
          label: data.confirmed_label,
          confidence: data.confidence ?? 0,
        })
      }
    }

    ws.onerror = (e) => {
      console.error("❌ WS error", e)
    }

    ws.onclose = (e) => {
      console.warn("⚠️ WS closed", e.code, e.reason)
      setConnected(false)
      setLiveGuess(null)
      setConfirmedResult(null)
      if (userStoppedRef.current) return
      reconnectTimerRef.current = setTimeout(connectWs, 1500)
    }
  }

  const startRealtime = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch {
      alert("Camera access denied")
      return
    }

    userStoppedRef.current = false
    setRunning(true)
    connectWs()
    startStreaming()
  }

  const runDeviceLoop = (
    landmarker: HandLandmarker,
    classifier: TreeClassifier,
    delegate: "GPU" | "CPU"
  ) => {
    const smoother = new PredictionSmoother()
    let lastVideoTime = -1
    let lastUiUpdate = 0
    let framesSinceStats = 0
    let statsStart = performance.now()

    const tick = () => {
      if (!deviceActiveRef.current) return
      const video = videoRef.current

      // only process when the camera has produced a new frame
      if (video && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime
        const now = performance.now()

        let label: string | null = null
        let confidence = 0
        const detected = landmarker.detect(video)
        if (detected.landmarks.length > 0) {
          const p = classifier.predict(computeFeatures(detected.landmarks[0]))
          label = p.label
          confidence = p.confidence
        }

        const confirmed = smoother.update(label, confidence, now)
        framesSinceStats++

        // the model runs every frame; the screen only needs ~15 updates/second
        if (now - lastUiUpdate > 66) {
          lastUiUpdate = now
          setLiveGuess({ label, confidence })
          if (confirmed) {
            setConfirmedResult((prev) => ({
              label: confirmed,
              confidence:
                label === confirmed
                  ? confidence
                  : prev?.label === confirmed
                    ? prev.confidence
                    : confidence,
            }))
          }
        }
        if (now - statsStart > 1000) {
          setDeviceStats({
            fps: Math.round((framesSinceStats * 1000) / (now - statsStart)),
            delegate,
          })
          framesSinceStats = 0
          statsStart = now
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const startDevice = async () => {
    setDeviceError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      alert("Camera access denied")
      return
    }

    deviceActiveRef.current = true
    setRunning(true)

    try {
      const [{ landmarker, delegate }, classifier] = await Promise.all([
        createHandLandmarker("IMAGE"),
        loadClassifier("/model/mudra_meta.json", "/model/mudra_trees.bin"),
      ])
      if (!deviceActiveRef.current) {
        landmarker.close() // Stop was pressed while the model was loading
        return
      }
      landmarkerRef.current = landmarker
      setDeviceReady(true)
      runDeviceLoop(landmarker, classifier, delegate)
    } catch (e) {
      console.error("❌ on-device model failed to load", e)
      stopRealtime()
      setDeviceError(
        "Couldn't load the on-device model. Check your connection and try again."
      )
    }
  }

  const startStreaming = () => {
    intervalRef.current = setInterval(() => {
      if (
        !videoRef.current ||
        !canvasRef.current ||
        !wsRef.current ||
        wsRef.current.readyState !== WebSocket.OPEN
      )
        return

      const video = videoRef.current
      if (!video.videoWidth) return

      // Keep the camera's aspect ratio. Squashing the frame to a 160x160
      // square (what the old image CNN needed) distorts the hand and makes
      // hand detection fail.
      const width = 320
      const height = Math.round((video.videoHeight / video.videoWidth) * width)
      if (canvasRef.current.width !== width || canvasRef.current.height !== height) {
        canvasRef.current.width = width
        canvasRef.current.height = height
      }

      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      ctx.drawImage(video, 0, 0, width, height)

      const base64 = canvasRef.current
        .toDataURL("image/jpeg", 0.7)
        .split(",")[1]

      wsRef.current.send(JSON.stringify({ image: base64 }))
    }, 120)
  }

  const stopRealtime = () => {
    userStoppedRef.current = true
    deviceActiveRef.current = false
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    landmarkerRef.current?.close()
    landmarkerRef.current = null
    setDeviceReady(false)
    setDeviceStats(null)
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (videoRef.current?.srcObject) {
      ;(videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop())
    }
    wsRef.current?.close()
    setRunning(false)
    setConnected(false)
    setLiveGuess(null)
    setConfirmedResult(null)
  }

  /* ===============================
     IMAGE MODE LOGIC
  =============================== */

  const chooseFile = (f: File) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setUploadError(null)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) chooseFile(f)
  }

  const predictImage = async () => {
    if (!file) return
    setPredicting(true)
    setUploadError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/predict-image`,
        { method: "POST", body: formData }
      )
      setResult(await res.json())
    } catch {
      setUploadError("Couldn't reach the server. It may be waking up, so please try again in a moment.")
    } finally {
      setPredicting(false)
    }
  }

  /* ===============================
     MODE SWITCH CLEANUP
  =============================== */

  useEffect(() => {
    stopRealtime()
    setResult(null)
    setDeviceError(null)
  }, [mode])

  const isLive = mode !== "image"
  const liveReady = mode === "device" ? deviceReady : connected
  const imageShown = result && result.label ? { label: result.label, confidence: result.confidence } : null

  const readingMessage =
    mode === "image"
      ? predicting
        ? "Reading the mudra..."
        : result && !result.label
          ? "No hand found in this photo. Try a clearer shot with your whole hand in view."
          : "Upload a photo to see a prediction."
      : !running
        ? "Start the camera to see predictions."
        : !liveReady
          ? mode === "device"
            ? "Loading the on-device model..."
            : "Connecting to the server..."
          : liveGuess?.label
            ? `Detecting: ${liveGuess.label}... hold the pose steady`
            : "Show a mudra to the camera."

  // leaving the page must end the session, otherwise the reconnect loop
  // would keep running in the background
  useEffect(() => () => stopRealtime(), [])

  const modeNote =
    mode === "device"
      ? "Runs on your device. Nothing is uploaded."
      : mode === "realtime"
        ? "Camera frames are sent to our server for analysis."
        : "Your photo is sent to our server for a single prediction."

  const scrollToStudio = () =>
    document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" })

  const shown = mode === "image" ? imageShown : confirmedResult
  const shownMudra = mudraOf(shown?.label)
  const shownTier = tierOf(shown?.label)

  const statusText =
    mode === "device"
      ? deviceReady
        ? `On-device${deviceStats ? ` · ${deviceStats.fps} fps · ${deviceStats.delegate}` : ""}`
        : running
          ? "Loading the model. The first time downloads about 10 MB."
          : "Stopped"
      : connected
        ? "Connected"
        : running
          ? "Connecting. The server may take up to a minute to wake up."
          : "Stopped"
  const statusDot = liveReady ? "bg-emerald-500" : running ? "bg-amber-500" : "bg-muted-foreground/50"

  const modes: { value: Mode; label: string }[] = [
    { value: "device", label: "Realtime" },
    { value: "image", label: "Image upload" },
  ]

  const tips = [
    "Use a plain, uncluttered background.",
    "Keep your whole hand and wrist inside the frame.",
    "Good, even light helps. Avoid strong backlight.",
    "Hold the pose steady for about a second.",
    "Fill the frame: a larger hand is detected more reliably.",
  ]

  return (
    <main className="bg-background pt-16">
      <Navbar />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-border bg-muted/50">
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] text-primary/25 md:-right-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {[190, 150, 110, 70, 30].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI) / 12
            return <line key={i} x1={200 + Math.cos(a) * 30} y1={200 + Math.sin(a) * 30} x2={200 + Math.cos(a) * 190} y2={200 + Math.sin(a) * 190} />
          })}
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
          <p className="eyebrow mb-5">AI studio · Single-hand mudras</p>
          <h1 className="font-serif text-5xl leading-[1.05] text-foreground md:text-7xl">Mudra recognition</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Show a hand mudra to your camera or upload a photo. A calm, visual way to practise shape and steadiness.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12 lg:px-8">
        {/* MODE */}
        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-muted/40 p-5 md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Choose a practice mode
            </p>
            <div role="radiogroup" aria-label="Practice mode" className="flex flex-wrap gap-2">
              {modes.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  role="radio"
                  aria-checked={mode === m.value}
                  onClick={() => setMode(m.value)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-medium transition",
                    mode === m.value
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-background/70 text-foreground/80 hover:bg-background hover:text-accent"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground md:max-w-xs md:text-right">{modeNote}</p>
        </div>

        <div id="studio" className="mt-6 grid scroll-mt-24 gap-6 lg:grid-cols-2">
          {/* PRACTICE SPACE */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="border-b border-border px-6 pb-6 pt-7 md:px-8">
              <p className="eyebrow mb-2">Practice space</p>
              <h2 className="font-serif text-3xl text-foreground">{isLive ? "Live camera" : "Upload a photo"}</h2>
              <span className="mt-4 grid h-11 w-11 place-items-center rounded-full bg-primary/20 text-accent">
                {isLive ? <Camera className="h-5 w-5" aria-hidden /> : <Upload className="h-5 w-5" aria-hidden />}
              </span>
            </div>

            <div className="space-y-5 p-6 md:p-8">
              {isLive ? (
                <>
                  <div
                    className={cn(
                      "relative aspect-video overflow-hidden rounded-2xl bg-[#241b14] transition-shadow duration-300",
                      running && liveGuess?.label && "ring-2 ring-primary/80 shadow-[0_0_0_6px_rgba(244,163,0,0.12)]"
                    )}
                  >
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium tracking-wider text-white/80">
                      16:9
                    </span>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={cn("h-full w-full object-cover transition-opacity", running ? "opacity-100" : "opacity-0")}
                    />
                    {!running && (
                      <div className="absolute inset-0 grid place-items-center text-white/70">
                        <div className="flex flex-col items-center gap-3">
                          <Camera className="h-9 w-9" aria-hidden />
                          <span className="text-sm">Camera preview is off</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <canvas ref={canvasRef} width="160" height="160" className="hidden" />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                      <span className={cn("h-2 w-2 shrink-0 rounded-full", statusDot)} aria-hidden />
                      {statusText}
                    </p>
                    {!running ? (
                      <Button
                        onClick={mode === "device" ? startDevice : startRealtime}
                        className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                      >
                        <Camera className="mr-2 h-4 w-4" aria-hidden />
                        Start camera
                      </Button>
                    ) : (
                      <Button onClick={stopRealtime} variant="destructive" className="rounded-full px-6">
                        <Square className="mr-2 h-4 w-4" aria-hidden />
                        Stop
                      </Button>
                    )}
                  </div>

                  {deviceError && (
                    <p className="flex items-start gap-2 rounded-2xl border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>Couldn&apos;t load the on-device model. Check your connection and try again.</span>
                    </p>
                  )}
                </>
              ) : (
                <>
                  <label
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      const f = e.dataTransfer.files?.[0]
                      if (f) chooseFile(f)
                    }}
                    className={cn(
                      "relative grid aspect-video cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-dashed bg-background/50 transition",
                      dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent/60"
                    )}
                  >
                    <input type="file" accept="image/*" onChange={onFileChange} className="sr-only" />
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="Your uploaded photo" className="h-full w-full object-contain" />
                    ) : (
                      <span className="flex flex-col items-center gap-3 px-6 text-center text-muted-foreground">
                        <Upload className="h-8 w-8" aria-hidden />
                        <span className="text-sm">
                          Drop a photo here, or <span className="font-medium text-accent underline underline-offset-2">browse</span>
                        </span>
                      </span>
                    )}
                  </label>
                  <Button
                    onClick={predictImage}
                    disabled={!file || predicting}
                    className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {predicting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> : null}
                    {predicting ? "Reading the mudra..." : "Predict mudra"}
                  </Button>
                  {uploadError && (
                    <p className="rounded-2xl border border-rose-300/70 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
                      {uploadError}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* YOUR READING */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 pb-6 pt-7 md:px-8">
              <div>
                <p className="eyebrow mb-2">Your reading</p>
                <h2 className="font-serif text-3xl text-foreground">Prediction</h2>
              </div>
              <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {mode === "device" ? "On-device" : mode === "realtime" ? "Server" : "Photo"}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center p-6 md:p-8" aria-live="polite">
              {shown && shown.label ? (
                <div className="rise-in" key={shown.label}>
                  <p className="font-serif text-6xl leading-none text-foreground md:text-7xl">{shown.label}</p>
                  {shownMudra && <p className="mt-3 text-lg text-muted-foreground">{shownMudra.gloss}</p>}

                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-background/80">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500"
                        style={{ width: `${Math.round(shown.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right font-medium tabular-nums text-foreground">
                      {Math.round(shown.confidence * 100)}%
                    </span>
                  </div>

                  {shownTier && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <TierBadge tier={shownTier} />
                      <span className="text-sm text-muted-foreground">{TIERS[shownTier].summary}</span>
                    </div>
                  )}

                  {mode !== "image" && liveGuess?.label && liveGuess.label !== shown.label && (
                    <p className="mt-5 text-sm text-muted-foreground">Detecting: {liveGuess.label}...</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-background/70 text-muted-foreground">
                    {predicting ? <Loader2 className="h-6 w-6 animate-spin" aria-hidden /> : <Camera className="h-6 w-6" aria-hidden />}
                  </span>
                  <p className="max-w-xs text-muted-foreground">
                    {readingMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TIPS */}
        <Collapsible className="mt-6 rounded-2xl border border-border bg-background/50">
          <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium text-foreground">
            <span className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              Tips for best results
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" aria-hidden />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="grid gap-3 px-5 pb-5 text-sm text-muted-foreground md:grid-cols-2">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <MudraGuide onTry={scrollToStudio} />
    </main>
  )
}
