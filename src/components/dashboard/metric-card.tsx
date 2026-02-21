import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SEOStatus } from "@/lib/seo-mock-data";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  status: SEOStatus;
  description?: string;
  className?: string;
}
export function MetricCard({ title, value, unit, status, description, className }: MetricCardProps) {
  const statusColors = {
    good: "text-green-600 bg-green-50 border-green-100",
    average: "text-orange-600 bg-orange-50 border-orange-100",
    poor: "text-red-600 bg-red-50 border-red-100",
  };
  const ringColors = {
    good: "ring-green-500",
    average: "ring-orange-500",
    poor: "ring-red-500",
  };
  return (
    <Card className={cn("overflow-hidden border-none shadow-sm bg-card transition-all hover:shadow-md", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="size-3.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-bold tracking-tight", 
            status === 'good' ? "text-foreground" : status === 'average' ? "text-orange-600" : "text-red-600"
          )}>
            {value}
          </span>
          {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className={cn("size-2 rounded-full", ringColors[status])} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border", statusColors[status])}>
            {status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}