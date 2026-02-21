import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CrawlerTable } from "@/components/domain/crawler-table";
import { CrawlerSidebar } from "@/components/domain/crawler-sidebar";
import { DetailPanel } from "@/components/domain/detail-panel";
import { CrawlUrl } from "@/lib/domain-mock-data";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSEOStore } from "@/lib/store";
export default function DomainCrawler() {
  const [selectedUrl, setSelectedUrl] = useState<CrawlUrl | undefined>();
  const fetchTasks = useSEOStore(s => s.fetchTasks);
  const tasks = useSEOStore(s => s.tasks);
  const activeTask = tasks[0]; // Simplified for demo
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <AppLayout container className="bg-slate-50/50 h-screen overflow-hidden" contentClassName="p-0 sm:p-0 lg:p-0 max-w-none">
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 gap-2">
                <Play className="size-3" />
                Resume
              </Button>
              <Button size="sm" variant="outline" className="h-8 gap-2">
                <Pause className="size-3" />
                Pause
              </Button>
            </div>
            <div className="h-6 w-px bg-border mx-2" />
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md">
              <span className="text-xs font-bold text-muted-foreground uppercase">Project:</span>
              <span className="text-xs font-semibold">{activeTask?.domain || "No Active Crawl"}</span>
            </div>
            <div className="flex-1 max-w-md relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Filter results..."
                className="h-8 pl-8 text-xs bg-muted/50 border-none ring-0 focus-visible:ring-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="size-8" onClick={() => fetchTasks()}>
              <RefreshCw className="size-4" />
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-2">
              <Download className="size-3" />
              Export
            </Button>
          </div>
        </div>
        {/* Resizable Layout */}
        <div className="flex-1 min-h-0">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={80} minSize={60}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={65} minSize={40}>
                  <div className="h-full p-4">
                    <CrawlerTable onRowSelect={setSelectedUrl} selectedId={selectedUrl?.id} />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={35} minSize={20}>
                  <DetailPanel url={selectedUrl} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} minSize={15} className="bg-white">
              <div className="h-full p-6 border-l">
                <CrawlerSidebar />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </AppLayout>
  );
}