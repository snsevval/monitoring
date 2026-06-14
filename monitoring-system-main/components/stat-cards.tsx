import { Satellite, TriangleAlert, Gauge, Clock, Siren, TrendingUp } from "lucide-react"
import { stats } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

const iconMap = { satellite: Satellite, alert: TriangleAlert, gauge: Gauge }
const accentMap = {
  success: { text: "text-success", bg: "", stroke: "var(--success)" },
  warning: { text: "text-warning", bg: "", stroke: "var(--warning)" },
  primary: { text: "text-primary", bg: "", stroke: "var(--primary)" },
}

function Sparkline({ color }: { color: string }) {
  const pts = [18, 12, 20, 14, 24, 19, 30, 22, 34]
  const w = 96
  const h = 34
  const max = Math.max(...pts)
  const path = pts
    .map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / max) * (h - 4) - 2}`)
    .join(" ")
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-[19rem] shrink-0 border-r border-border bg-card p-4">{children}</div>
  )
}

function buildCards(): ReactNode[] {
  const cards: ReactNode[] = stats.map((s) => {
    const Icon = iconMap[s.icon as keyof typeof iconMap]
    const accent = accentMap[s.accent]
    return (
      <CardShell key={s.id}>
        <div className="flex items-center gap-2.5">
          <span className={cn("flex size-8 items-center justify-center", accent.bg, accent.text)}>
            <Icon className="size-4" />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {s.label}
          </p>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-3xl font-semibold tracking-tight">
            {s.value}
            {s.suffix && <span className="text-base text-muted-foreground"> {s.suffix}</span>}
          </p>
          <Sparkline color={accent.stroke} />
        </div>
        <p className={cn("mt-2 flex items-center gap-1 text-xs font-medium", accent.text)}>
          <TrendingUp className="size-3.5" />
          {s.delta}
          <span className="text-muted-foreground">{s.deltaLabel}</span>
        </p>
      </CardShell>
    )
  })

  cards.push(
    <CardShell key="last-data">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center text-muted-foreground">
          <Clock className="size-4" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Son Veri Zamanı
        </p>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">
        14.06.2026 <span className="text-muted-foreground">12:30</span>
      </p>
      <p className="mt-2 text-xs text-muted-foreground">2 dk önce güncellendi</p>
    </CardShell>,
  )

  cards.push(
    <CardShell key="active-alert">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center text-muted-foreground">
            <Siren className="size-4" />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-danger">
            Aktif Uyarı
          </p>
        </div>
        <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
          <circle cx="20" cy="20" r="16" fill="none" stroke="var(--secondary)" strokeWidth="4" />
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 16}
            strokeDashoffset={2 * Math.PI * 16 * 0.25}
          />
        </svg>
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight">7</p>
      <p className="mt-1 text-xs text-muted-foreground">3 yüksek, 4 orta</p>
    </CardShell>,
  )

  return cards
}

export function StatCards() {
  const cards = buildCards()
  return (
    <div className="marquee-track group relative overflow-hidden border-y border-border">
      {/* kenarlardaki yumuşak gölge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee">
        {cards}
        {cards.map((card, i) => (
          <div key={`dup-${i}`} aria-hidden="true" className="contents">
            {card}
          </div>
        ))}
      </div>
    </div>
  )
}
