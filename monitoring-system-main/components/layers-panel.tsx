"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { layers } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={cn(
        "relative h-5 w-9 rounded-full transition-colors",
        on ? "bg-success" : "bg-secondary",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-4 rounded-full bg-white transition-transform",
          on ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

export function LayersPanel() {
  const [state, setState] = useState(() => Object.fromEntries(layers.map((l) => [l.id, l.active])))

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold tracking-wide">KATMANLAR</h2>
      <ul className="mt-3 space-y-2.5">
        {layers.map((l) => (
          <li key={l.id} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 text-sm">
              <span className="size-2.5 rounded-sm" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
            <Toggle on={state[l.id]} onClick={() => setState((s) => ({ ...s, [l.id]: !s[l.id] }))} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export function QuickRegion() {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold tracking-wide">HIZLI BÖLGE SEÇİMİ</h2>
      <button className="mt-3 flex w-full items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2 text-sm">
        Türkiye
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      <div className="mt-3 flex aspect-[16/9] items-center justify-center rounded-lg border border-border bg-background/40">
        <svg viewBox="0 0 200 90" className="w-full px-4">
          <path
            d="M20 50 Q30 30 55 32 Q80 24 110 30 Q140 26 165 34 Q182 40 180 52 Q175 64 150 62 Q120 70 90 64 Q55 70 32 62 Q18 58 20 50 Z"
            fill="var(--secondary)"
            stroke="var(--muted-foreground)"
            strokeWidth="0.8"
          />
          <rect
            x="118" y="40" width="26" height="18"
            fill="none" stroke="var(--primary)" strokeWidth="1.4" rx="2"
          />
        </svg>
      </div>
      <Link
        href="/analiz"
        className="mt-3 block w-full rounded-lg bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Bölgeyi Analiz Et
      </Link>
    </section>
  )
}
