import { Flame, Waves, Sprout, Cloud, SlidersHorizontal } from "lucide-react"
import { anomalies, severityLabel } from "@/lib/dashboard-data"
import { severityStyles } from "@/components/recent-anomalies"
import { cn } from "@/lib/utils"

const iconMap = { flame: Flame, waves: Waves, sprout: Sprout, cloud: Cloud }

export function TimelineBar() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide">ZAMAN ÇİZELGESİ</h2>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium">
          <SlidersHorizontal className="size-3.5" />
          Filtrele
        </button>
      </div>

      <div className="relative mt-5">
        <div className="absolute left-0 right-0 top-1.5 h-px bg-border" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {anomalies.map((a) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap]
            const s = severityStyles[a.severity]
            return (
              <div key={a.id} className="relative pl-1">
                <span className="absolute left-0 top-0 size-3 rounded-full bg-primary ring-4 ring-card" />
                <p className="mt-5 text-xs font-semibold text-muted-foreground">{a.time}</p>
                <div className="mt-1.5 flex items-start gap-2.5">
                  <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", s.icon)}>
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.place}</p>
                  </div>
                </div>
                <span className={cn("mt-2 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold", s.badge)}>
                  {severityLabel[a.severity]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
