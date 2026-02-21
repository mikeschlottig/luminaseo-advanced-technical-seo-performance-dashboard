import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { mockAuditChecklist } from "@/lib/seo-mock-data";
import { CheckCircle2, XCircle, ScrollText, PieChart, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
export function AuditSidebar() {
  const score = 88;
  return (
    <div className="h-full flex flex-col bg-card border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm tracking-tight">Audit Health</h3>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
            A- Grade
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black">{score}</span>
            <span className="text-xs text-muted-foreground font-medium">/ 100 points</span>
          </div>
          <Progress value={score} className="h-2 bg-muted [&>div]:bg-indigo-600" />
        </div>
      </div>
      <Tabs defaultValue="all" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-6 mt-4 justify-start bg-transparent border-b rounded-none h-auto p-0 gap-4">
          <TabsTrigger value="all" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent rounded-none">All</TabsTrigger>
          <TabsTrigger value="errors" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent rounded-none">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="flex-1 overflow-hidden m-0 p-0">
          <ScrollArea className="h-full px-6">
            <div className="py-4 space-y-4">
              {mockAuditChecklist.map((item) => (
                <div key={item.id} className="flex gap-3 group">
                  <div className="mt-0.5 shrink-0">
                    {item.passed ? (
                      <CheckCircle2 className="size-4 text-green-500" />
                    ) : (
                      <XCircle className="size-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-none mb-1 group-hover:text-indigo-600 transition-colors">
                      {item.task}
                    </p>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="errors" className="flex-1 overflow-hidden m-0 p-0">
          <ScrollArea className="h-full px-6">
            <div className="py-4 space-y-4">
              {mockAuditChecklist.filter(i => !i.passed).map((item) => (
                <div key={item.id} className="flex gap-3 bg-red-50/50 p-3 rounded-lg border border-red-100">
                  <XCircle className="size-4 text-red-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold leading-none mb-1 text-red-900">{item.task}</p>
                    <p className="text-[10px] text-red-700/80">Missing optimization detected during crawl.</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="p-4 bg-muted/30 border-t">
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all">
          Export Full PDF Report
        </button>
      </div>
    </div>
  );
}