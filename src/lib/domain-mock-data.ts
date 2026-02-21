export interface CrawlUrl {
  id: string;
  url: string;
  statusCode: number;
  type: 'html' | 'image' | 'css' | 'js';
  title: string;
  metaDescription: string;
  depth: number;
  inlinks: number;
  outlinks: number;
  responseTime: number; // ms
  size: number; // kb
  indexability: 'Indexable' | 'Non-Indexable';
}
export const mockCrawlData: CrawlUrl[] = [
  { id: '1', url: 'https://luminaseo.app/', statusCode: 200, type: 'html', title: 'Home - LuminaSEO', metaDescription: 'The best SEO tool.', depth: 0, inlinks: 45, outlinks: 12, responseTime: 240, size: 45, indexability: 'Indexable' },
  { id: '2', url: 'https://luminaseo.app/blog', statusCode: 200, type: 'html', title: 'Blog - LuminaSEO', metaDescription: 'Learn SEO tactics.', depth: 1, inlinks: 12, outlinks: 8, responseTime: 310, size: 62, indexability: 'Indexable' },
  { id: '3', url: 'https://luminaseo.app/pricing', statusCode: 200, type: 'html', title: 'Pricing - Affordable SEO', metaDescription: 'Get started for free.', depth: 1, inlinks: 8, outlinks: 4, responseTime: 210, size: 38, indexability: 'Indexable' },
  { id: '4', url: 'https://luminaseo.app/login', statusCode: 301, type: 'html', title: 'Login', metaDescription: '', depth: 1, inlinks: 5, outlinks: 0, responseTime: 150, size: 12, indexability: 'Non-Indexable' },
  { id: '5', url: 'https://luminaseo.app/dashboard', statusCode: 403, type: 'html', title: 'Access Denied', metaDescription: '', depth: 2, inlinks: 2, outlinks: 0, responseTime: 120, size: 5, indexability: 'Non-Indexable' },
  { id: '6', url: 'https://luminaseo.app/api/v1/user', statusCode: 404, type: 'js', title: '', metaDescription: '', depth: 3, inlinks: 1, outlinks: 0, responseTime: 95, size: 2, indexability: 'Non-Indexable' },
  { id: '7', url: 'https://luminaseo.app/assets/logo.png', statusCode: 200, type: 'image', title: '', metaDescription: '', depth: 1, inlinks: 25, outlinks: 0, responseTime: 80, size: 120, indexability: 'Indexable' },
  { id: '8', url: 'https://luminaseo.app/contact', statusCode: 200, type: 'html', title: 'Contact Us', metaDescription: 'Reach out today.', depth: 1, inlinks: 10, outlinks: 5, responseTime: 280, size: 41, indexability: 'Indexable' },
  { id: '9', url: 'https://luminaseo.app/terms', statusCode: 200, type: 'html', title: 'Terms of Service', metaDescription: 'Legal stuff.', depth: 1, inlinks: 4, outlinks: 2, responseTime: 190, size: 55, indexability: 'Indexable' },
  { id: '10', url: 'https://luminaseo.app/old-page', statusCode: 302, type: 'html', title: 'Moved', metaDescription: '', depth: 2, inlinks: 3, outlinks: 0, responseTime: 140, size: 8, indexability: 'Non-Indexable' },
];
export const mockSummaryStats = {
  total: 1540,
  crawled: 1245,
  remaining: 295,
  statusCodes: [
    { name: '2xx Success', value: 950, color: '#22c55e' },
    { name: '3xx Redir', value: 120, color: '#6366f1' },
    { name: '4xx Error', value: 45, color: '#f59e0b' },
    { name: '5xx Server', value: 10, color: '#ef4444' },
  ],
  indexability: [
    { name: 'Indexable', value: 1020, color: '#22c55e' },
    { name: 'Non-Indexable', value: 225, color: '#94a3b8' },
  ]
};
export const mockUrlDetails = {
  headers: [
    { name: 'Content-Type', value: 'text/html; charset=UTF-8' },
    { name: 'Server', value: 'cloudflare' },
    { name: 'Cache-Control', value: 'max-age=3600' },
    { name: 'X-Frame-Options', value: 'DENY' },
    { name: 'Content-Encoding', value: 'gzip' },
  ],
  inlinks: [
    { url: 'https://luminaseo.app/', anchor: 'Home', type: 'Hyperlink' },
    { url: 'https://luminaseo.app/blog', anchor: 'Resources', type: 'Hyperlink' },
    { url: 'https://luminaseo.app/sitemap.xml', anchor: '-', type: 'Sitemap' },
  ],
  outlinks: [
    { url: 'https://twitter.com/luminaseo', anchor: 'Twitter', type: 'External' },
    { url: 'https://github.com/luminaseo', anchor: 'Github', type: 'External' },
    { url: 'https://luminaseo.app/privacy', anchor: 'Privacy Policy', type: 'Internal' },
  ]
};