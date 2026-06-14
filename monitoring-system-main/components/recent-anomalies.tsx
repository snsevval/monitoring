import { Flame, Waves, Sprout, Cloud, ArrowRight } from "lucide-react"
import { anomalies, severityLabel, type Severity } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const iconMap = { flame: Flame, waves: Waves, sprout: Sprout, cloud: Cloud }

export const severityStyles: Record<Severity, { badge: string; icon: string }> = {
  yuksek: { badge: "bg-danger/15 text-danger", icon: "text-muted-foreground" },
  orta: { badge: "bg-warning/15 text-warning", icon: "text-muted-foreground" },
  dusuk: { badge: "bg-chart-5/15 text-chart-5", icon: "text-muted-foreground" },
}

export function RecentAnomalies() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide">SON ANOMALİLER</h2>
        <button className="flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-80">
          Tümünü Gör <ArrowRight className="size-3.5" />
        </button>
      </div>
      <ul className="mt-3 space-y-1">
        {anomalies.map((a) => {
          const Icon = iconMap[a.icon as keyof typeof iconMap]
          const s = severityStyles[a.severity]
          return (
            <li
              key={a.id}
              className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-accent/50"
            >
              <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", s.icon)}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.title}</p>
                <p className="truncate text-xs text-muted-foreground">{a.place}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-muted-foreground">{a.time}</span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  {severityLabel[a.severity]}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
