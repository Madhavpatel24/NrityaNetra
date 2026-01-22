// 'use client'

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import "@/styles/india-dance-map.css"; // adjust if needed

// const GEOJSON_URL = "/data/states_india.geojson";

// type TooltipState = {
//   visible: boolean;
//   x: number;
//   y: number;
//   stateName: string;
//   dance: string;
// };

// export default function IndiaDanceMapDebug(): JSX.Element {
//   const router = useRouter();
//   const [geoJson, setGeoJson] = useState<any | null>(null);
//   const [loadingGeo, setLoadingGeo] = useState(true);
//   const [geoError, setGeoError] = useState<string | null>(null);
//   const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, stateName: "", dance: "" });

//   useEffect(() => {
//     console.log("[DEBUG] IndiaDanceMap mounted");
//     const fetchGeo = async () => {
//       setLoadingGeo(true);
//       setGeoError(null);
//       try {
//         const res = await fetch(GEOJSON_URL);
//         console.log("[DEBUG] fetched geo status:", res.status);
//         if (!res.ok) throw new Error(`Geo fetch failed: ${res.status} ${res.statusText}`);
//         const data = await res.json();
//         console.log("[DEBUG] geojson keys:", Object.keys(data || {}));
//         setGeoJson(data);
//       } catch (err: any) {
//         console.error("[DEBUG] geo fetch error:", err);
//         setGeoError(String(err.message || err));
//       } finally {
//         setLoadingGeo(false);
//       }
//     };
//     fetchGeo();
//   }, []);

//   const projectionConfig = useMemo(() => ({ scale: 1000, center: [80, 22] }), []);

//   const handleMouseMove = useCallback((evt: React.MouseEvent, stateName: string, dance: string) => {
//     const padding = 8;
//     const x = evt.clientX ?? 0;
//     const y = evt.clientY ?? 0;
//     setTooltip({ visible: true, x: x + padding, y: y + padding, stateName, dance });
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setTooltip((t) => ({ ...t, visible: false }));
//   }, []);

//   const handleClick = useCallback((stateName: string, dance: string) => {
//     console.log("[DEBUG] clicked:", stateName, dance);
//     // router.push...
//   }, [router]);

//   return (
//     <div className="idm-container" aria-label="Map Debug">
//       <div style={{ marginBottom: "1rem" }}>
//         <Link href="/">
//           <button className="btn btn-secondary">Go to Homepage</button>
//         </Link>
//       </div>

//       <h2>India Dance Map — Debug</h2>

//       <div style={{ marginBottom: 12 }}>
//         <strong>GeoJSON status:</strong>{" "}
//         {loadingGeo ? "Loading..." : geoError ? `Error: ${geoError}` : geoJson ? "Loaded" : "Not loaded"}
//       </div>

//       {/* show small debug snapshot */}
//       <pre style={{ maxHeight: 120, overflow: "auto", background: "#f6f6f6", padding: 8 }}>
//         {geoJson ? JSON.stringify({ type: geoJson.type, features: (geoJson.features || []).length }, null, 2) : "geoJson=null"}
//       </pre>

//       <div className="idm-map-wrapper" style={{ minHeight: 300, border: "1px dashed #ccc", padding: 8 }}>
//         {/* If geojson failed, render a fallback simple SVG so the page is not blank */}
//         {geoJson ? (
//           <ComposableMap projection="geoMercator" projectionConfig={projectionConfig} width={800} height={700}>
//             <Geographies geography={geoJson}>
//               {({ geographies }) => {
//                 console.log("[DEBUG] geographies length:", geographies.length);
//                 return geographies.map((geo) => {
//                   const stateName = (geo as any).properties?.NAME_1 || (geo as any).properties?.name || "unknown";
//                   return (
//                     <Geography
//                       key={(geo as any).rsmKey}
//                       geography={geo}
//                       onMouseMove={(evt) => handleMouseMove(evt as any, stateName, "dance")}
//                       onMouseLeave={handleMouseLeave}
//                       onClick={() => handleClick(stateName, "dance")}
//                       style={{
//                         default: { fill: "#F5EFE6", stroke: "#C9B8A5", strokeWidth: 0.6 },
//                         hover: { fill: "#E8DCCB", stroke: "#8B6F47", cursor: "pointer" },
//                         pressed: { fill: "#DFCDB6", stroke: "#7A5E3A" }
//                       }}
//                     />
//                   );
//                 });
//               }}
//             </Geographies>
//           </ComposableMap>
//         ) : (
//           <svg width="600" height="400" role="img" aria-label="fallback map">
//             <rect width="100%" height="100%" fill="#fff7ed" stroke="#e7d8c7" />
//             <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#777">
//               {loadingGeo ? "Loading geojson..." : geoError ? `Geo load error: ${geoError}` : "Geo not available"}
//             </text>
//           </svg>
//         )}
//       </div>

//       {tooltip.visible && (
//         <div className="idm-tooltip" style={{ position: "fixed", left: tooltip.x, top: tooltip.y, zIndex: 9999 }}>
//           <div style={{ padding: 6, background: "white", border: "1px solid #ddd" }}>
//             <strong>{tooltip.stateName}</strong>
//             <div style={{ fontSize: 12 }}>{tooltip.dance}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client'

import React, { useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import "@/styles/india-dance-map.css"

const INDIA_STATES_GEOJSON = "/data/states_india.geojson"

type IndiaDanceMapProps = {
  onHover?: (stateName: string, dance: string) => void
  onLeave?: () => void
}

/* mapping (same as before) */
const STATE_TO_DANCE: Record<string, string> = {
  "Andhra Pradesh": "Kuchipudi",
  "Arunachal Pradesh": "Ponung",
  "Assam": "Sattriya",
  "Bihar": "Bidesia",
  "Chhattisgarh": "Panthi",
  "Goa": "Fugdi",
  "Gujarat": "Garba",
  "Haryana": "Phag Dance",
  "Himachal Pradesh": "Nati",
  "Jharkhand": "Paika",
  "Karnataka": "Yakshagana",
  "Kerala": "Theyyam",
  "Madhya Pradesh": "Matki Dance",
  "Maharashtra": "Lavani",
  "Manipur": "Manipuri",
  "Meghalaya": "Wangala",
  "Mizoram": "Cheraw",
  "Nagaland": "Chang Lo",
  "Odisha": "Odissi",
  "Orissa": "Odissi",
  "Punjab": "Bhangra",
  "Rajasthan": "Ghoomar",
  "Sikkim": "Mask Dance",
  "Tamil Nadu": "Bharatanatyam",
  "Telangana": "Perini Shivatandavam",
  "Tripura": "Hojagiri",
  "Uttar Pradesh": "Charkula",
  "Uttarakhand": "Chholiya",
  "NCT of Delhi": "Kathak",
  "Delhi": "Kathak",
  "West Bengal": "Gaudiya Nritya",
  "Jammu & Kashmir": "Rouf",
  "Lakshadweep": "Lava",
  "Andaman & Nicobar Islands": "Nicobari",
  "Andaman & Nicobar Island": "Nicobari",
}

/* your actual pages */
const DANCE_ROUTES: Record<string, string> = {
  Bharatanatyam: "/dancesofIndia/bharatanatyam",
  Kathak: "/dancesofIndia/kathak",
  Kuchipudi: "/dancesofIndia/kuchipudi",
  Kathakali: "/dancesofIndia/kathakali",
  Garba: "/dancesofIndia/garba",
  Bhangra: "/dancesofIndia/bhangra",
  Lavani: "/dancesofIndia/lavani",
  // add more when you create them, e.g.
  // Odissi: "/dancesofIndia/odissi",
  // Manipuri: "/dancesofIndia/manipuri",
}

function normalizeName(s?: string) {
  if (!s) return ""
  return String(s)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ & /g, " and ")
    .replace(/’/g, "'")
    .replace(/–/g, "-")
}

function slugifyDance(dance?: string) {
  return String(dance || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getDanceForState(stateName?: string) {
  const n = normalizeName(stateName)
  if (!n) return ""
  if (STATE_TO_DANCE[n]) return STATE_TO_DANCE[n]

  const alt = n
    .replace("Nct of ", "")
    .replace("State of ", "")
    .replace("Andaman and Nicobar", "Andaman & Nicobar Islands")
    .replace("Andaman & Nicobar Island", "Andaman & Nicobar Islands")
    .replace("Orissa", "Odisha")
    .trim()

  if (STATE_TO_DANCE[alt]) return STATE_TO_DANCE[alt]

  const key = Object.keys(STATE_TO_DANCE).find(
    (k) => k.toLowerCase() === n.toLowerCase()
  )
  return key ? STATE_TO_DANCE[key] : ""
}

function getDanceImage(dance?: string) {
  const slug = slugifyDance(dance)
  return slug ? `/images/dances/${slug}.jpg` : "/images/dances/placeholder.jpg"
}

export default function IndiaDanceMap({
  onHover,
  onLeave,
}: IndiaDanceMapProps): JSX.Element {
  const router = useRouter()

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    stateName: "",
    dance: "",
  })
  const [activeKey, setActiveKey] = useState<string | null>(null)

  const projectionConfig = useMemo(
    () => ({ scale: 1000, center: [80, 22] }),
    []
  )

  const handleMouseMove = useCallback(
    (evt: React.MouseEvent<SVGElement, MouseEvent>, stateName: string) => {
      const dance = getDanceForState(stateName) || "Indian classical dance"
      const padding = 10
      const x = evt.clientX ?? 0
      const y = evt.clientY ?? 0

      setTooltip({
        visible: true,
        x: x + padding,
        y: y + padding,
        stateName,
        dance,
      })

      onHover?.(stateName, dance)
    },
    [onHover]
  )

  const handleMouseLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }))
    setActiveKey(null)
    onLeave?.()
  }, [onLeave])

  const handleMouseEnterState = useCallback((rsmKey: string | number) => {
    setActiveKey(String(rsmKey))
  }, [])

  const handleClick = useCallback(
    (stateName: string) => {
      const dance = getDanceForState(stateName) || stateName
      const route = DANCE_ROUTES[dance]

      if (route) {
        router.push(route)
      } else {
        router.push(`/explore?state=${encodeURIComponent(stateName)}`)
      }
    },
    [router]
  )

  return (
    <div
      className="idm-container"
      aria-label="Map of India with classical and regional dances"
    >
      <div className="idm-map-wrapper">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          width={900}
          height={700}
        >
          <Geographies geography={INDIA_STATES_GEOJSON}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const props = geo.properties || {}
                const stateName =
                  props.NAME_1 ||
                  props.NAME_0 ||
                  props.st_nm ||
                  props.NAME ||
                  props.name ||
                  ""
                const normalized = normalizeName(stateName)
                const dance =
                  getDanceForState(normalized) || "Indian classical dance"
                const key = geo.rsmKey
                const isActive = activeKey === String(key)

                return (
                  <Geography
                    key={key}
                    geography={geo}
                    tabIndex={0}
                    role="button"
                    aria-label={`${normalized} - ${dance}`}
                    className={`idm-state ${
                      isActive ? "idm-state--active" : ""
                    }`}
                    onMouseMove={(evt: React.MouseEvent<SVGElement, MouseEvent>) =>
                      handleMouseMove(evt, normalized)
                    }
                    onMouseEnter={() => handleMouseEnterState(key)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(normalized)}
                    style={{
                      default: {
                        fill: "#e0d4c6",
                        stroke: "#a07a48",
                        strokeWidth: 0.9,
                      },
                      hover: {
                        fill: "#d7bfa6",
                        stroke: "#7a4f2a",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#cfab86",
                        stroke: "#6f4622",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>

        {tooltip.visible && (
  <div
    className="idm-tooltip"
    style={{
      position: "fixed",
      left: tooltip.x,
      top: tooltip.y,
      zIndex: 999,
      pointerEvents: "none",
      background: "#ffffff",
      borderRadius: 14,
      width: 180,              // ⬅ increased width
      padding: 0,
      boxShadow: "0 8px 28px rgba(0,0,0,0.20)",
      overflow: "hidden",
      transition: "all 0.15s ease-out",
    }}
    role="tooltip"
    aria-hidden={!tooltip.visible}
  >
    {/* IMAGE FULL WIDTH */}
    <img
      src={getDanceImage(tooltip.dance)}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/dances/placeholder.jpg"
      }}
      alt={`${tooltip.dance} image`}
      style={{
        width: "100%",
        height: 120,          // square-ish
        objectFit: "cover",
      }}
    />

    {/* TEXT BELOW */}
    <div style={{ padding: "10px 12px" }}>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
        {tooltip.stateName}
      </div>
      <div style={{ fontSize: 13, color: "#666" }}>{tooltip.dance}</div>
    </div>
  </div>
)}

      </div>
    </div>
  )
}
