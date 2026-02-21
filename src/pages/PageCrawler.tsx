import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ChartsSection } from "@/components/dashboard/charts-section";
import { HeadAnalysis } from "@/components/dashboard/head-analysis";
import { AuditSidebar } from "@/components/dashboard/audit-sidebar";
import { Button } from "@/components/ui/button";
import { useSEOStore } from "@/lib/store";
import { Search, RotateCcw, LayoutPanelLeft, Loader2 } from "lucide-react";
import { mockPageMetrics } from "@/lib/seo-mock-data";
export function PageCrawler() {
  const [url, setUrl] = useState("https://luminaseo.app/");
  const analyzePage = useSEOStore(s => s.analyzePage);
  const isAnalyzing = useSEOStore(s => s.isAnalyzing);
  const activeReport = useSEOStore(s => s.activeReport);
  const handleCrawl = async () => {
    if (!url) return;
    await analyzePage(url);
  };
  // Use report data if available, fallback to mock for visuals
  const displayMetrics = activeReport ? activeReport.metrics : mockPageMetrics;
  return (
    <AppLayout container className="bg-slate-50/50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex-1 flex items-center gap-3 bg-slate-100 rounded-lg px-3 focus-within:ring-2 ring-indigo-500/20 transition-all border border-transparent focus-within:border-indigo-200">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm py-2.5 w-full font-medium"
                placeholder="Enter URL to crawl..."
                disabled={isAnalyzing}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2" onClick={handleCrawl} disabled={isAnalyzing}>
                <RotateCcw className="size-4" />
                Rescan
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 gap-2 min-w-[120px]" 
                onClick={handleCrawl}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
                Analyze
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9 flex flex-col gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayMetrics.map((m, i) => (
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
              <HeadAnalysis />
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <LayoutPanelLeft className="size-4 text-indigo-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Visual Analytics</h3>
                </div>
                <ChartsSection />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 h-[calc(100vh-200px)] sticky top-24">
              <AuditSidebar />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}