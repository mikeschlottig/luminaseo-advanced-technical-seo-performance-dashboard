import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CrawlUrl, mockUrlDetails } from "@/lib/domain-mock-data";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Link2, Layout, FileText, ImageIcon } from "lucide-react";
interface DetailPanelProps {
  url?: CrawlUrl;
}
export function DetailPanel({ url }: DetailPanelProps) {
  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 text-muted-foreground text-sm border-t">
        Select a URL from the list to see details
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col bg-card border-t shadow-lg overflow-hidden">
      <div className="px-6 py-3 border-b flex items-center justify-between bg-muted/10">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="font-mono text-[10px]">{url.statusCode}</Badge>
          <span className="text-sm font-semibold truncate max-w-[600px]">{url.url}</span>
        </div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Inspector</div>
      </div>
      <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="px-6 h-10 bg-transparent border-b rounded-none justify-start gap-4">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none h-full px-0">Overview</TabsTrigger>
          <TabsTrigger value="headers" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none h-full px-0">HTTP Headers</TabsTrigger>
          <TabsTrigger value="inlinks" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none h-full px-0">Inlinks</TabsTrigger>
          <TabsTrigger value="outlinks" className="text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none h-full px-0">Outlinks</TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-hidden">
          <TabsContent value="overview" className="h-full m-0 p-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailGroup title="Page Content" icon={FileText}>
                <DetailRow label="Title" value={url.title || "Missing"} />
                <DetailRow label="Description" value={url.metaDescription || "Missing"} />
                <DetailRow label="Depth" value={url.depth.toString()} />
                <DetailRow label="Type" value={url.type.toUpperCase()} />
              </DetailGroup>
              <DetailGroup title="Technical" icon={Layout}>
                <DetailRow label="Indexability" value={url.indexability} />
                <DetailRow label="Response Time" value={`${url.responseTime} ms`} />
                <DetailRow label="Size" value={`${url.size} KB`} />
              </DetailGroup>
            </div>
          </TabsContent>
          <TabsContent value="headers" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-2xs font-bold h-9">Header Name</TableHead>
                    <TableHead className="text-2xs font-bold h-9">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUrlDetails.headers.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-[11px] font-medium text-muted-foreground w-[200px]">{h.name}</TableCell>
                      <TableCell className="text-[11px] font-mono">{h.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="inlinks" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-2xs font-bold h-9">Source URL</TableHead>
                    <TableHead className="text-2xs font-bold h-9">Anchor Text</TableHead>
                    <TableHead className="text-2xs font-bold h-9">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUrlDetails.inlinks.map((link, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-[11px] font-mono text-indigo-600">{link.url}</TableCell>
                      <TableCell className="text-[11px] font-medium">{link.anchor}</TableCell>
                      <TableCell className="text-[11px]">
                        <Badge variant="outline" className="text-[9px] uppercase">{link.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="outlinks" className="h-full m-0 p-0">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-2xs font-bold h-9">Target URL</TableHead>
                    <TableHead className="text-2xs font-bold h-9">Anchor Text</TableHead>
                    <TableHead className="text-2xs font-bold h-9">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUrlDetails.outlinks.map((link, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-[11px] font-mono text-indigo-600">{link.url}</TableCell>
                      <TableCell className="text-[11px] font-medium">{link.anchor}</TableCell>
                      <TableCell className="text-[11px]">
                        <Badge variant="outline" className="text-[9px] uppercase">{link.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
function DetailGroup({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <h4 className="text-xs font-bold uppercase tracking-widest">{title}</h4>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 border-muted pl-3">
      <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}