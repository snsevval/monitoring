"use client"

import { ChevronDown } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Dot,
} from "recharts"
import { trendData } from "@/lib/dashboard-data"

export function RiskTrendChart() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide">ZAMAN İÇİNDE RİSK DEĞİŞİMİ</h2>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium">
          Tüm Türkiye
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="gun"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ stroke: "var(--primary)", strokeOpacity: 0.3 }}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="skor"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#riskFill)"
              dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              label={({ x, y, value, index }: any) =>
                index === trendData.length - 1 ? (
                  <g>
                    <rect x={x - 16} y={y - 28} width={32} height={18} rx={4} fill="var(--primary)" />
                    <text x={x} y={y - 15} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--primary-foreground)">
                      {value}
                    </text>
                  </g>
                ) : (
                  <g />
                )
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
