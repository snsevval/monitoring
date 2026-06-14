import { Sidebar } from "@/components/sidebar"
import { TopHeader } from "@/components/top-header"
import { StatCards } from "@/components/stat-cards"
import { MapPanel } from "@/components/map-panel"
import { RecentAnomalies } from "@/components/recent-anomalies"
import { AiComment } from "@/components/ai-comment"
import { LayersPanel, QuickRegion } from "@/components/layers-panel"
import { RiskTrendChart } from "@/components/risk-trend-chart"
import { RegionRisk } from "@/components/region-risk"
import { TimelineBar } from "@/components/timeline-bar"
import { SystemStatus } from "@/components/system-status"

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-5">
          <StatCards />

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="space-y-4 xl:col-span-2">
              <MapPanel />
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <RiskTrendChart />
                <RegionRisk />
              </div>
            </div>

            <div className="space-y-4">
              <RecentAnomalies />
              <AiComment />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <LayersPanel />
                <QuickRegion />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <TimelineBar />
            </div>
            <SystemStatus />
          </div>
        </main>
      </div>
    </div>
  )
}
