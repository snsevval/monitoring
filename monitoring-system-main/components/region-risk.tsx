"use client"

import { ChevronDown } from "lucide-react"

function scoreColor(score: number) {
  // 0 -> green, 50 -> yellow, 100 -> red
  const hue = 130 - (score / 100) * 130
  return `hsl(${hue} 70% 45%)`
}

type Region = { name: string; score: number; col: string; row: string }

const regions: Region[] = [
  { name: "Marmara", score: 78, col: "1 / 3", row: "1" },
  { name: "İç Anadolu", score: 62, col: "3 / 5", row: "1" },
  { name: "Karadeniz", score: 58, col: "5 / 7", row: "1" },
  { name: "Ege", score: 45, col: "1 / 2", row: "2" },
  { name: "Akdeniz", score: 35, col: "2 / 4", row: "2" },
  { name: "G.Doğu Anadolu", score: 30, col: "4 / 6", row: "2" },
  { name: "D.Anadolu", score: 46, col: "6 / 7", row: "2" },
]

export function RegionRisk() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide">BÖLGELERE GÖRE ORTALAMA RİSK</h2>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium">
          Son 7 Gün
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>

      <div
        className="mt-4 grid gap-1.5"
        style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(2, 64px)" }}
      >
        {regions.map((r) => {
          const c = scoreColor(r.score)
          return (
            <div
              key={r.name}
              className="flex flex-col items-center justify-center rounded-lg text-center"
              style={{
                gridColumn: r.col,
                gridRow: r.row,
                backgroundColor: `${c}26`,
                border: `1px solid ${c}66`,
              }}
            >
              <span className="text-lg font-semibold leading-none" style={{ color: c }}>
                {r.score}
              </span>
              <span className="mt-1 px-1 text-[10px] leading-tight text-muted-foreground">
                {r.name}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-4">
        <div className="h-2 rounded-full bg-[linear-gradient(90deg,#16a34a,#84cc16,#eab308,#f97316,#ef4444)]" />
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
    </section>
  )
}
