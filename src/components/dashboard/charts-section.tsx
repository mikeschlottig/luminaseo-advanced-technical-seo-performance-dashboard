import React from "react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as ReTooltip
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { mockKeywordData, mockContentRatio, mockImageData, mockLinkData } from "@/lib/seo-mock-data";
export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="col-span-1 shadow-sm border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-medium">Top Keyword Areas</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockKeywordData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Metrics" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1 shadow-sm border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-medium">Content Ratio</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px] flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockContentRatio}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {mockContentRatio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute translate-y-4 text-center">
            <span className="text-2xl font-bold">75%</span>
            <p className="text-[10px] text-muted-foreground uppercase">Text Density</p>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-1 shadow-sm border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-medium">Image Quality</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockImageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {mockImageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ReTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1 shadow-sm border-muted">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-sm font-medium">Link Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockLinkData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {mockLinkData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ReTooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}