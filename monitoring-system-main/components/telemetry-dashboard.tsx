"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  Pause,
  Play,
  Satellite,
} from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

const SAT_CONFIGS: Record<
  string,
  { orbit: number; inc: number; ecc: number; period: number; type: string }
> = {
  "SAT-TR-042": { orbit: 550, inc: 53.2, ecc: 0.0002, period: 95.5, type: "LEO" },
  "SAT-TR-017": { orbit: 8500, inc: 45.0, ecc: 0.0015, period: 351, type: "MEO" },
  "SAT-TR-099": { orbit: 35786, inc: 0.1, ecc: 0.0001, period: 1436, type: "GEO" },
}

const CHANNELS = ["Sıcaklık (°C)", "Güç (W)", "Sinyal (dBm)", "Voltaj (V)", "Basınç (mTorr)"]
const CH_LABELS = ["Sıcaklık", "Güç", "Sinyal", "Voltaj", "Basınç"]
const CH_UNITS = ["°C", "W", "dBm", "V", "mTorr"]
const CH_DECIMALS = [1, 1, 1, 2, 3]
const CH_NOMINAL = [22, 85, -72, 28.5, 1.2]
const CH_STD = [4, 8, 3, 0.5, 0.08]

type Stat = { sum: number; sum2: number; n: number }
type Alert = { level: "crit" | "warn" | "info"; msg: string; time: string }
type Point = { time: string; temp: number; power: number; anomaly: number | null }

function randn() {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function genVal(i: number, t: number) {
  const base = CH_NOMINAL[i]
  const noise = randn() * CH_STD[i]
  const drift = Math.sin(t / 30) * CH_STD[i] * 0.5
  const spike =
    Math.random() < 0.04
      ? (Math.random() > 0.5 ? 1 : -1) * CH_STD[i] * (2.5 + Math.random() * 2)
      : 0
  return base + noise + drift + spike
}

function zScore(val: number, stats: Stat) {
  if (stats.n < 5) return 0
  const mean = stats.sum / stats.n
  const variance = stats.sum2 / stats.n - mean * mean
  const std = Math.sqrt(Math.max(variance, 0.001))
  return Math.abs((val - mean) / std)
}

const statusColor = { ok: "#1D9E75", warn: "#EF9F27", crit: "#E24B4A" } as const

export function TelemetryDashboard() {
  const [currentSat, setCurrentSat] = useState("SAT-TR-042")
  const [windowSize, setWindowSize] = useState(60)
  const [paused, setPaused] = useState(false)
  const [clock, setClock] = useState("")
  const [history, setHistory] = useState<Point[]>([])
  const [vals, setVals] = useState<number[]>([...CH_NOMINAL])
  const [zs, setZs] = useState<number[]>(CHANNELS.map(() => 0))
  const [anomalyCount, setAnomalyCount] = useState(0)
  const [alerts, setAlerts] = useState<Alert[]>([])

  const tickRef = useRef(0)
  const statsRef = useRef<Stat[]>(CHANNELS.map(() => ({ sum: 0, sum2: 0, n: 0 })))
  const pausedRef = useRef(paused)
  const windowRef = useRef(windowSize)
  pausedRef.current = paused
  windowRef.current = windowSize

  // reset on satellite change
  useEffect(() => {
    statsRef.current = CHANNELS.map(() => ({ sum: 0, sum2: 0, n: 0 }))
    tickRef.current = 0
    setHistory([])
    setAlerts([])
    setAnomalyCount(0)
  }, [currentSat])

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return
      tickRef.current += 1
      const t = tickRef.current
      const now = new Date()
      const timeStr = now.toTimeString().slice(0, 8)

      const newVals = CHANNELS.map((_, i) => genVal(i, t))
      newVals.forEach((v, i) => {
        const s = statsRef.current[i]
        s.sum += v
        s.sum2 += v * v
        s.n += 1
      })
      const newZs = CHANNELS.map((_, i) => zScore(newVals[i], statsRef.current[i]))
      const isAnomaly = newZs.some((z) => z > 2.8)

      setVals(newVals)
      setZs(newZs)
      setClock(timeStr)
      if (isAnomaly) setAnomalyCount((c) => c + 1)

      setHistory((h) => {
        const next = [
          ...h,
          {
            time: timeStr,
            temp: newVals[0],
            power: newVals[1],
            anomaly: isAnomaly ? newVals[0] : null,
          },
        ]
        return next.slice(-windowRef.current)
      })

      if (isAnomaly) {
        const critIdx = newZs.findIndex((z) => z > 3.5)
        const warnIdx = newZs.findIndex((z) => z > 2.8)
        const idx = critIdx >= 0 ? critIdx : warnIdx
        const level: Alert["level"] = critIdx >= 0 ? "crit" : "warn"
        const chName = CHANNELS[idx].split(" ")[0]
        setAlerts((a) =>
          [
            ...a,
            {
              level,
              msg: `${chName} anormalliği tespit edildi (Z=${newZs[idx].toFixed(2)})`,
              time: timeStr,
            },
          ].slice(-12),
        )
      }
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const statuses = zs.map((z) => (z > 3 ? "crit" : z > 2 ? "warn" : "ok"))
  const anyCrit = zs.some((z) => z > 3)
  const anyWarn = zs.some((z) => z > 2)
  const cfg = SAT_CONFIGS[currentSat]

  const orbitItems = [
    { label: "İrtifa", val: `${cfg.orbit.toLocaleString("tr-TR")} km` },
    { label: "İnklinasyon", val: `${cfg.inc}°` },
    { label: "Dışmerkezlik", val: cfg.ecc.toFixed(4) },
    { label: "Periyot", val: `${cfg.period} dk` },
    { label: "Orbit tipi", val: cfg.type },
    {
      label: "Sinyal gecikmesi",
      val: cfg.type === "GEO" ? "240 ms" : cfg.type === "MEO" ? "45 ms" : "4 ms",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
      {/* top bar */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Genel bakışa dön"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[15px] font-medium">
              <span
                className={cn(
                  "size-2 rounded-full",
                  anyCrit ? "bg-danger" : anyWarn ? "bg-warning" : "bg-success",
                )}
              />
              Uydu Telemetri İzleme
            </div>
            <div className="mt-0.5 font-mono text-xs text-muted-foreground">
              {currentSat} · {cfg.type} · {cfg.orbit.toLocaleString("tr-TR")} km
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-success/40 px-2.5 py-1 text-[11px] text-success">
            <span className="size-1.5 rounded-full bg-success" />
            CANLI
          </span>
          <span className="font-mono text-xs text-muted-foreground">{clock || "--:--:--"}</span>
        </div>
      </header>

      {/* control row */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        <select
          value={currentSat}
          onChange={(e) => setCurrentSat(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value="SAT-TR-042">SAT-TR-042 (LEO)</option>
          <option value="SAT-TR-017">SAT-TR-017 (MEO)</option>
          <option value="SAT-TR-099">SAT-TR-099 (GEO)</option>
        </select>
        <select
          value={windowSize}
          onChange={(e) => setWindowSize(+e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value={60}>Son 60 örnek</option>
          <option value={120}>Son 120 örnek</option>
          <option value={30}>Son 30 örnek</option>
        </select>
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:bg-secondary"
        >
          {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          {paused ? "Devam" : "Duraklat"}
        </button>
      </div>

      {/* metrics */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l-2 border-border pl-4 py-2">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{CH_LABELS[i]}</div>
            <div
              className="mt-2 text-[28px] font-semibold"
              style={{ color: statusColor[statuses[i]] }}
            >
              {vals[i].toFixed(CH_DECIMALS[i])}{" "}
              <span className="text-[14px] font-normal text-muted-foreground">{CH_UNITS[i]}</span>
            </div>
            <div className="mt-1 text-[11px] font-medium text-muted-foreground">
              Z-Score: {zs[i].toFixed(2)} • {" "}
              <span style={{ color: statusColor[statuses[i]] }}>
                {statuses[i] === "ok" ? "Normal" : statuses[i] === "warn" ? "Uyarı" : "Kritik"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* charts row 1 */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
            <Activity className="size-5" />
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Telemetri Akışı — Sıcaklık & Güç</h3>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={history} margin={{ top: 5, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(128,128,128,0.12)" vertical={false} />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: "#888" }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={40}
                />
                <YAxis
                  yAxisId="temp"
                  tick={{ fontSize: 10, fill: "#378ADD" }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <YAxis
                  yAxisId="power"
                  orientation="right"
                  tick={{ fontSize: 10, fill: "#1D9E75" }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "var(--muted-foreground)" }}
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temp"
                  stroke="#378ADD"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                  name="Sıcaklık (°C)"
                />
                <Line
                  yAxisId="power"
                  type="monotone"
                  dataKey="power"
                  stroke="#1D9E75"
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                  name="Güç (W)"
                />
                <Scatter
                  yAxisId="temp"
                  dataKey="anomaly"
                  fill="#E24B4A"
                  shape="triangle"
                  isAnimationActive={false}
                  name="Anomali"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* anomaly score bars */}
        <div>
          <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5" />
              <h3 className="text-sm font-semibold tracking-wide text-foreground">Anomali Skoru</h3>
            </div>
            <span className="text-sm font-bold text-danger">
              {anomalyCount}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {CHANNELS.map((name, i) => {
              const pct = Math.min(100, (zs[i] / 4) * 100)
              return (
                <div key={name} className="flex items-center gap-2 text-xs">
                  <div className="w-16 truncate text-muted-foreground">{name.split(" ")[0]}</div>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: statusColor[statuses[i]] }}
                    />
                  </div>
                  <div className="w-7 text-right font-mono text-[11px] text-muted-foreground">
                    {zs[i].toFixed(1)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* charts row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
            <Satellite className="size-5" />
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Orbital Parametreler</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {orbitItems.map((it) => (
              <div key={it.label} className="text-xs">
                <div className="text-muted-foreground">{it.label}</div>
                <div className="mt-0.5 font-medium text-success">{it.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
            <Bell className="size-5" />
            <h3 className="text-sm font-semibold tracking-wide text-foreground">Uyarılar</h3>
          </div>
          <div className="flex flex-col gap-2">
            {alerts.length === 0 ? (
              <div className="text-xs text-muted-foreground">Aktif uyarı yok</div>
            ) : (
              alerts
                .slice(-4)
                .reverse()
                .map((a, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-start gap-2 rounded-lg border px-3 py-2 text-xs",
                      a.level === "crit" && "border-danger/40 bg-danger/10 text-danger",
                      a.level === "warn" && "border-warning/40 bg-warning/10 text-warning",
                      a.level === "info" && "border-primary/40 bg-primary/10 text-primary",
                    )}
                  >
                    {a.level === "crit" ? (
                      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                    ) : (
                      <Bell className="mt-0.5 size-3.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="leading-snug">{a.msg}</div>
                      <div className="mt-0.5 font-mono text-[11px] opacity-70">{a.time}</div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
