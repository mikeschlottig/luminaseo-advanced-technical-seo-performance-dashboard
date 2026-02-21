export type SEOStatus = 'good' | 'average' | 'poor';
export interface Metric {
  title: string;
  value: string;
  unit?: string;
  status: SEOStatus;
  description: string;
}
export const mockPageMetrics: Metric[] = [
  { title: 'Performance', value: '92', status: 'good', description: 'Overall page performance' },
  { title: 'FCP', value: '0.8', unit: 's', status: 'good', description: 'First Contentful Paint' },
  { title: 'LCP', value: '1.2', unit: 's', status: 'good', description: 'Largest Contentful Paint' },
  { title: 'CLS', value: '0.01', status: 'good', description: 'Cumulative Layout Shift' },
  { title: 'Accessibility', value: '85', status: 'average', description: 'Screen reader compatibility' },
  { title: 'SEO Score', value: '98', status: 'good', description: 'On-page optimization level' },
  { title: 'TTFB', value: '250', unit: 'ms', status: 'average', description: 'Time to First Byte' },
  { title: 'Total Size', value: '1.4', unit: 'MB', status: 'poor', description: 'Page weight' },
];
export const mockKeywordData = [
  { subject: 'SEO', A: 120, B: 110, fullMark: 150 },
  { subject: 'Performance', A: 98, B: 130, fullMark: 150 },
  { subject: 'Backend', A: 86, B: 130, fullMark: 150 },
  { subject: 'Vitals', A: 99, B: 100, fullMark: 150 },
  { subject: 'Content', A: 85, B: 90, fullMark: 150 },
  { subject: 'Speed', A: 65, B: 85, fullMark: 150 },
];
export const mockContentRatio = [
  { name: 'Content', value: 75, fill: '#22c55e' },
  { name: 'Remaining', value: 25, fill: '#e5e7eb' },
];
export const mockImageData = [
  { name: 'Optimized', value: 12, fill: '#22c55e' },
  { name: 'Missing Alt', value: 3, fill: '#ef4444' },
  { name: 'Large', value: 5, fill: '#f59e0b' },
];
export const mockLinkData = [
  { name: 'Internal', value: 45, fill: '#6366f1' },
  { name: 'External', value: 12, fill: '#a855f7' },
  { name: 'Broken', value: 2, fill: '#ef4444' },
];
export const mockHeadTags = {
  title: "LuminaSEO - Professional Technical Analysis Tool",
  description: "Advanced real-time crawling simulation, core web vitals monitoring, and deep technical audits for SEO experts.",
  canonical: "https://luminaseo.app/",
  h1: "High Performance SEO Dashboard",
  ogImage: "https://luminaseo.app/og-main.png",
  favicon: "https://luminaseo.app/favicon.ico",
  structuredData: true,
  openGraph: true,
};
export const mockAuditChecklist = [
  { id: '1', task: 'Canonical Tag Presence', passed: true, category: 'General' },
  { id: '2', task: 'Meta Description Length', passed: true, category: 'Content' },
  { id: '3', task: 'H1 Tag Uniqueness', passed: true, category: 'Content' },
  { id: '4', task: 'Image Alt Attributes', passed: false, category: 'Images' },
  { id: '5', task: 'HTTPS Configuration', passed: true, category: 'General' },
  { id: '6', task: 'Robots.txt Reachability', passed: true, category: 'General' },
  { id: '7', task: 'Mobile Friendly Viewport', passed: true, category: 'Technical' },
  { id: '8', task: 'LCP Threshold', passed: true, category: 'Technical' },
];