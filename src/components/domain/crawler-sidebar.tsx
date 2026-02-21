import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockSummaryStats } from "@/lib/domain-mock-data";
import { Activity, ShieldCheck, Database } from "lucide-react";
export function CrawlerSidebar() {
  const progressValue = (mockSummaryStats.crawled / mockSummaryStats.total) * 100;
  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto pr-1">
      <Card className="shadow-none border-muted">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Crawl Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-black">{mockSummaryStats.crawled}</span>
            <span className="text-xs text-muted-foreground font-medium">/ {mockSummaryStats.total} URLs</span>
          </div>
          <Progress value={progressValue} className="h-2 mb-1" />
          <p className="text-[10px] text-muted-foreground text-right">{progressValue.toFixed(1)}% Complete</p>
        </CardContent>
      </Card>
      <Card className="shadow-none border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status Codes</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockSummaryStats.statusCodes}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={4}
                dataKey="value"
              >
                {mockSummaryStats.statusCodes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
                itemStyle={{ padding: '0px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="shadow-none border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Indexability</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {mockSummaryStats.indexability.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.value}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${(item.value / 1245) * 100}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-auto p-4 bg-indigo-600 rounded-xl text-white">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="size-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Health Check</span>
        </div>
        <p className="text-[11px] opacity-90 leading-relaxed">
          The domain health is optimal. 92% of pages return a 200 OK status.
        </p>
      </div>
    </div>
  );
}