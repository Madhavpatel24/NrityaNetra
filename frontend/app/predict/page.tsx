"use client"

import { useEffect, useRef, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Upload, StopCircle } from "lucide-react"

type Mode = "realtime" | "image"

export default function MudraPredictPage() {
  const [mode, setMode] = useState<Mode>("realtime")
  const [running, setRunning] = useState(false)
  const [connected, setConnected] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const [result, setResult] = useState<{
    label: string
    confidence: number
  } | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  /* ===============================
     REALTIME LOGIC
  =============================== */

  const startRealtime = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!)
      wsRef.current = ws

      ws.onopen = () => {
        console.log("✅ WS connected")
        setConnected(true)
        startStreaming()
      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setResult(data)
      }

      ws.onerror = (e) => {
        console.error("❌ WS error", e)
      }

      ws.onclose = (e) => {
        console.warn("⚠️ WS closed", e.code, e.reason)
        stopRealtime()
      }


      ws.onopen = () => {
        setConnected(true)
        setRunning(true)
        startStreaming()
      }

      ws.onmessage = (e) => {
        setResult(JSON.parse(e.data))
      }

      ws.onclose = stopRealtime
      ws.onerror = stopRealtime
    } catch {
      alert("Camera access denied")
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

      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      ctx.drawImage(videoRef.current, 0, 0, 160, 160)

      const base64 = canvasRef.current
        .toDataURL("image/jpeg", 0.7)
        .split(",")[1]

      wsRef.current.send(JSON.stringify({ image: base64 }))
    }, 120)
  }

  const stopRealtime = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop())
    }
    wsRef.current?.close()
    setRunning(false)
    setConnected(false)
  }

  /* ===============================
     IMAGE MODE LOGIC
  =============================== */

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  const predictImage = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/predict-image`,
      { method: "POST", body: formData }
    )

    setResult(await res.json())
  }

  /* ===============================
     MODE SWITCH CLEANUP
  =============================== */

  useEffect(() => {
    stopRealtime()
    setResult(null)
  }, [mode])

  return (
    <main className="pt-16">
      <Navbar />

      {/* HEADER */}
      <section className="bg-gradient-to-b from-accent/10 to-background py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl mb-3">Mudra Recognition</h1>
          <p className="text-muted-foreground text-lg">
            Realtime or image-based mudra detection
          </p>

          {/* MODE SWITCH */}
          <div className="mt-6 flex gap-3">
            <Button
              variant={mode === "realtime" ? "default" : "outline"}
              onClick={() => setMode("realtime")}
              className="gap-2"
            >
              <Camera className="w-4 h-4" />
              Realtime
            </Button>

            <Button
              variant={mode === "image" ? "default" : "outline"}
              onClick={() => setMode("image")}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              Image Upload
            </Button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT CARD */}
          <Card className="p-8">
            <h2 className="font-serif text-2xl mb-6">
              {mode === "realtime" ? "Live Camera" : "Upload Image"}
            </h2>

            {mode === "realtime" ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 rounded-lg bg-black mb-4"
                />

                <canvas ref={canvasRef} width="160" height="160" className="hidden" />

                {!running ? (
                  <Button onClick={startRealtime} className="w-full gap-2">
                    <Camera className="w-4 h-4" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={stopRealtime}
                    variant="destructive"
                    className="w-full gap-2"
                  >
                    <StopCircle className="w-4 h-4" />
                    Stop
                  </Button>
                )}

                <p className="text-sm mt-2">
                  Status:{" "}
                  <span className={connected ? "text-green-600" : "text-red-600"}>
                    {connected ? "Connected" : "Disconnected"}
                  </span>
                </p>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="mb-4"
                />

                {preview && (
                  <img
                    src={preview}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}

                <Button
                  onClick={predictImage}
                  disabled={!file}
                  className="w-full"
                >
                  Predict Mudra
                </Button>
              </>
            )}
          </Card>

          {/* RESULT CARD */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5">
            <h2 className="font-serif text-2xl mb-6">Prediction</h2>

            {result ? (
              <>
                <p className="font-serif text-4xl text-primary mb-4">
                  {result.label}
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(result.confidence * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                  <span className="font-semibold">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                {mode === "realtime"
                  ? "Start camera to see predictions"
                  : "Upload an image to predict"}
              </p>
            )}
          </Card>
        </div>
      </section>
    </main>
  )
}
