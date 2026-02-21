import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CrawlUrl, mockCrawlData } from "@/lib/domain-mock-data";
interface CrawlerTableProps {
  onRowSelect: (url: CrawlUrl) => void;
  selectedId?: string;
}
export function CrawlerTable({ onRowSelect, selectedId }: CrawlerTableProps) {
  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return "bg-green-100 text-green-700 border-green-200";
    if (code >= 300 && code < 400) return "bg-blue-100 text-blue-700 border-blue-200";
    if (code >= 400 && code < 500) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-red-100 text-red-700 border-red-200";
  };
  return (
    <div className="relative h-full overflow-auto border rounded-lg bg-card">
      <Table>
        <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur z-10 shadow-sm">
          <TableRow>
            <TableHead className="w-[300px] text-2xs uppercase font-bold">Address</TableHead>
            <TableHead className="text-2xs uppercase font-bold text-center">Status</TableHead>
            <TableHead className="text-2xs uppercase font-bold text-center">Type</TableHead>
            <TableHead className="text-2xs uppercase font-bold text-center">Depth</TableHead>
            <TableHead className="text-2xs uppercase font-bold text-center">Inlinks</TableHead>
            <TableHead className="text-2xs uppercase font-bold text-center">Size</TableHead>
            <TableHead className="text-2xs uppercase font-bold">Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCrawlData.map((row) => (
            <TableRow
              key={row.id}
              className={cn(
                "cursor-pointer transition-colors hover:bg-muted/50",
                selectedId === row.id && "bg-indigo-50/50"
              )}
              onClick={() => onRowSelect(row)}
            >
              <TableCell className="font-mono text-[11px] max-w-[300px] truncate text-indigo-600">
                {row.url}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className={cn("font-bold text-[10px]", getStatusColor(row.statusCode))}>
                  {row.statusCode}
                </Badge>
              </TableCell>
              <TableCell className="text-center text-[11px] font-medium text-muted-foreground">
                {row.type.toUpperCase()}
              </TableCell>
              <TableCell className="text-center text-[11px]">{row.depth}</TableCell>
              <TableCell className="text-center text-[11px] font-semibold">{row.inlinks}</TableCell>
              <TableCell className="text-center text-[11px]">{row.size} KB</TableCell>
              <TableCell className="text-[11px] max-w-[200px] truncate font-medium">
                {row.title || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}