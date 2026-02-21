import React, { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useSEOStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Search, AlertTriangle, Info, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
export default function ActivityLog() {
  const activities = useSEOStore(s => s.activities);
  const fetchActivities = useSEOStore(s => s.fetchActivities);
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);
  const getIcon = (type: string) => {
    switch (type) {
      case 'crawl_start': return <Search className="size-4 text-blue-500" />;
      case 'crawl_end': return <CheckCircle2 className="size-4 text-green-500" />;
      case 'alert': return <AlertTriangle className="size-4 text-amber-500" />;
      default: return <Info className="size-4 text-slate-500" />;
    }
  };
  return (
    <AppLayout container className="bg-slate-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground text-sm">Review a history of system events and audit trails.</p>
        </div>
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-6 relative">
                {/* Timeline vertical bar */}
                <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-slate-200" />
                <div className="space-y-8">
                  {activities.map((entry) => (
                    <div key={entry.id} className="relative flex gap-6 pl-2">
                      <div className="relative z-10 size-8 rounded-full bg-white border flex items-center justify-center shadow-sm">
                        {getIcon(entry.type)}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-foreground">{entry.message}</p>
                          <span className="text-[10px] font-medium text-muted-foreground bg-slate-100 px-2 py-0.5 rounded uppercase">
                            {entry.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {new Date(entry.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground">No recent activities found.</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}