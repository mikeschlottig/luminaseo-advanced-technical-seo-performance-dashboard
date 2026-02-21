export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export type SEOStatus = 'good' | 'average' | 'poor';
export interface SeoMetric {
  title: string;
  value: string;
  unit?: string;
  status: SEOStatus;
  description: string;
}
export interface SeoReport {
  id: string;
  url: string;
  metrics: SeoMetric[];
  score: number;
  timestamp: number;
}
export interface CrawlJob {
  id: string;
  domain: string;
  status: 'running' | 'paused' | 'completed' | 'failed';
  progress: number;
  totalUrls: number;
  crawledUrls: number;
  createdAt: number;
}
export interface ActivityEntry {
  id: string;
  type: 'crawl_start' | 'crawl_end' | 'alert' | 'system';
  message: string;
  timestamp: number;
  category: string;
}