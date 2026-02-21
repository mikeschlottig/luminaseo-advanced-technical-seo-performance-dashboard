import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, FileCode, Tag, Link2, Type } from "lucide-react";
import { mockHeadTags } from "@/lib/seo-mock-data";
import { Separator } from "@/components/ui/separator";
export function HeadAnalysis() {
  const items = [
    { label: "Title Tag", value: mockHeadTags.title, icon: Type, status: true },
    { label: "Meta Description", value: mockHeadTags.description, icon: Tag, status: true },
    { label: "Canonical URL", value: mockHeadTags.canonical, icon: Link2, status: true },
    { label: "Primary H1", value: mockHeadTags.h1, icon: FileCode, status: true },
  ];
  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="py-4 px-6 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Head Analysis</CardTitle>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            OpenGraph Active
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            JSON-LD Found
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 p-6 space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 p-2 rounded-lg bg-secondary/50 text-secondary-foreground">
                  <item.icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{item.label}</span>
                    <CheckCircle2 className="size-3 text-green-500" />
                  </div>
                  <p className="text-sm font-medium truncate text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 bg-muted/20 p-6 border-l flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase text-muted-foreground">Technical Health</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Favicon Setup</span>
                <CheckCircle2 className="size-4 text-green-500" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Viewport Meta</span>
                <CheckCircle2 className="size-4 text-green-500" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Charset Definition</span>
                <CheckCircle2 className="size-4 text-green-500" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">SSL / HTTPS</span>
                <CheckCircle2 className="size-4 text-green-500" />
              </div>
            </div>
            <div className="mt-auto p-3 rounded-lg bg-indigo-50 border border-indigo-100">
              <p className="text-[10px] text-indigo-700 font-bold uppercase mb-1">Crawl Insight</p>
              <p className="text-xs text-indigo-900 leading-relaxed">
                The page structure is well-formed. Ensure meta description stays under 160 characters.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}