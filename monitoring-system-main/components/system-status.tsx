import { systemServices } from "@/lib/dashboard-data"

function Gauge({ value }: { value: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex size-24 items-center justify-center">
      <svg viewBox="0 0 80 80" className="size-24 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--secondary)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--success)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-semibold">{value}%</span>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Optimal</span>
      </div>
    </div>
  )
}

export function SystemStatus() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold tracking-wide">SİSTEM DURUMU</h2>
      <div className="mt-3 flex items-center gap-5">
        <Gauge value={98} />
        <ul className="flex-1 space-y-2">
          {systemServices.map((s) => (
            <li key={s.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success shadow-[0_0_6px_var(--success)]" />
                {s.label}
              </span>
              <span className="text-xs font-medium text-success">{s.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
