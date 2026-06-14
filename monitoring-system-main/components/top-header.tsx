import { Search, Bell, ChevronDown, User, ShieldCheck } from "lucide-react"

export function TopHeader() {
  return (
    <header className="flex items-center gap-4 border-b border-border bg-sidebar/60 px-5 py-3 backdrop-blur">
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Bölge, koordinat veya etiket ara..."
          className="w-full rounded-lg border border-border bg-background/60 py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <ShieldCheck className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      <div className="ml-auto flex items-center gap-5">
        <div className="hidden items-center gap-4 text-right md:flex">
          <div>
            <p className="text-sm font-semibold leading-tight">14 Haziran 2026</p>
          </div>
          <div className="font-mono text-sm text-muted-foreground">12:45 UTC</div>
        </div>

        <span className="flex items-center gap-2 rounded-full border border-success/40 px-3 py-1.5 text-xs font-semibold text-success">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          CANLI
        </span>

        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          <Bell className="size-5" />
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 pr-2 text-muted-foreground transition-colors hover:text-foreground">
          <span className="flex size-7 items-center justify-center rounded-md text-muted-foreground">
            <User className="size-4" />
          </span>
          <ChevronDown className="size-4" />
        </button>
      </div>
    </header>
  )
}
