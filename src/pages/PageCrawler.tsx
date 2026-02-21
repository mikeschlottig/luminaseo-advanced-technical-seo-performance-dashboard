import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { HeadAnalysis } from "@/components/dashboard/head-analysis";
import { AuditSidebar } from "@/components/dashboard/audit-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockPageMetrics } from "@/lib/seo-mock-data";
import { Search, RotateCcw, LayoutPanelLeft } from "lucide-react";
export function PageCrawler() {
  const [url, setUrl] = useState("https://luminaseo.app/");
  return (
    <AppLayout container className="bg-slate-50/50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex-1 flex items-center gap-3 bg-slate-100 rounded-lg px-3 focus-within:ring-2 ring-indigo-500/20 transition-all border border-transparent focus-within:border-indigo-200">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm py-2.5 w-full font-medium"
                placeholder="Enter URL to crawl..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <RotateCcw className="size-4" />
                Rescan
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                <Search className="size-4" />
                Crawl Page
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
              {/* Top Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockPageMetrics.map((m, i) => (
                  <MetricCard
                    key={i}
                    title={m.title}
                    value={m.value}
                    unit={m.unit}
                    status={m.status}
                    description={m.description}
                  />
                ))}
              </div>
              {/* Head Analysis */}
              <HeadAnalysis />
              {/* Charts Row */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <LayoutPanelLeft className="size-4 text-indigo-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Visual Analytics</h3>
                </div>
                <ChartsSection />
              </div>
            </div>
            {/* Sticky Audit Sidebar */}
            <div className="col-span-12 lg:col-span-3 h-[calc(100vh-200px)] sticky top-24">
              <AuditSidebar />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}