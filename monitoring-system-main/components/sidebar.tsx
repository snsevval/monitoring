"use client"

import { useState } from "react"
import {
  Layers,
  Map,
  Radar,
  Boxes,
  Clock,
  FileText,
  Sparkles,
  Bell,
  Database,
  Activity,
  Settings,
  Orbit,
  RefreshCw,
  Menu,
  ChevronLeft,
} from "lucide-react"
import { navItems } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const iconMap = {
  layers: Layers,
  map: Map,
  radar: Radar,
  stack: Boxes,
  clock: Clock,
  file: FileText,
  sparkles: Sparkles,
  bell: Bell,
  database: Database,
  activity: Activity,
  settings: Settings,
}

export function Sidebar() {
  const [active, setActive] = useState("genel")
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      "flex shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-300",
      isCollapsed ? "w-16" : "w-60"
    )}>
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl text-muted-foreground">
          <Orbit className="size-6" />
        </div>
        {!isCollapsed && (
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-foreground">UZAY GÖZLEM</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              AI Destekli Anomali İzleme
            </p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
        >
          {isCollapsed ? <Menu className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn("size-[18px]", isActive && "text-primary")} />
              {!isCollapsed && item.label}
            </button>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="m-3 rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Veri Kaynağı
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-success shadow-[0_0_8px_var(--success)]" />
            <p className="text-sm font-semibold">Sentinel-2 MSI</p>
          </div>
          <dl className="mt-3 space-y-2 text-xs">
            <Row label="Son Alım" value="14.06.2026 12:30 UTC" />
            <Row label="Çözünürlük" value="10 m / piksel" />
            <Row label="Bulut Kapsama" value="12%" />
          </dl>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent">
            <RefreshCw className="size-3.5" />
            Veri Güncelle
          </button>
        </div>
      )}
    </aside>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  )
}
