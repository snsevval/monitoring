"use client"

import Image from "next/image"
import { Layers, Crosshair, Frame, Plus, Minus, Play, Maximize2, Shuffle, ChevronDown } from "lucide-react"

const cities = [
  { name: "İstanbul", x: 28, y: 30 },
  { name: "Bursa", x: 31, y: 38 },
  { name: "Ankara", x: 46, y: 44 },
  { name: "İzmir", x: 20, y: 53 },
  { name: "Antalya", x: 38, y: 67 },
  { name: "Adana", x: 56, y: 64 },
  { name: "Trabzon", x: 72, y: 33 },
  { name: "Diyarbakır", x: 75, y: 55 },
]

const days = ["07 Haz", "08 Haz", "09 Haz", "10 Haz", "11 Haz", "12 Haz", "13 Haz", "14 Haz"]

export function MapPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3">
        <span className="flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          CANLI GÖRÜNÜM
        </span>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
            Sentinel-2 MSI
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <button className="rounded-lg border border-border bg-background/70 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground">
            <Shuffle className="size-4" />
          </button>
          <button className="rounded-lg border border-border bg-background/70 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground">
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>

      {/* left controls */}
      <div className="absolute left-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1.5">
        {[Layers, Crosshair, Frame].map((Icon, i) => (
          <button
            key={i}
            className="rounded-lg border border-border bg-background/70 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <Icon className="size-4" />
          </button>
        ))}
        <div className="mt-1 overflow-hidden rounded-lg border border-border bg-background/70 backdrop-blur">
          <button className="block p-2 text-muted-foreground transition-colors hover:text-foreground">
            <Plus className="size-4" />
          </button>
          <button className="block border-t border-border p-2 text-muted-foreground transition-colors hover:text-foreground">
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      {/* map image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/turkey-satellite-heatmap.png"
          alt="Türkiye uydu anomali ısı haritası"
          fill
          priority
          className="object-cover"
        />
        {cities.map((c) => (
          <div
            key={c.name}
            className="absolute z-10 flex items-center gap-1.5"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span className="size-1.5 rounded-full bg-foreground/80 ring-2 ring-background/40" />
            <span className="text-[11px] font-medium text-foreground/90 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
              {c.name}
            </span>
          </div>
        ))}

        {/* legend */}
        <div className="absolute bottom-4 right-4 z-20 w-52 rounded-xl border border-border bg-background/80 p-3 backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Risk Skoru
          </p>
          <div className="mt-2 h-2 rounded-full bg-[linear-gradient(90deg,#16a34a,#84cc16,#eab308,#f97316,#ef4444)]" />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* playback */}
      <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3">
        <button className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90">
          <Play className="size-4 fill-current" />
        </button>
        <div className="relative flex-1">
          <div className="h-1 rounded-full bg-secondary" />
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2">
            {days.map((_, i) => (
              <span
                key={i}
                className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-muted-foreground/50"
                style={{ left: `${(i / (days.length - 1)) * 100}%` }}
              />
            ))}
            <span className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/25" />
          </div>
          <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
