import { Hono } from "hono";
import type { Env } from './core-utils';
import { SeoReportEntity, CrawlJobEntity, ActivityEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // REPORTS
  app.get('/api/reports', async (c) => {
    return ok(c, await SeoReportEntity.list(c.env));
  });
  app.post('/api/reports/analyze', async (c) => {
    const { url } = await c.req.json() as { url: string };
    if (!url) return bad(c, 'URL required');
    // Simulate processing delay and result
    const report = await SeoReportEntity.create(c.env, {
      id: crypto.randomUUID(),
      url,
      score: 85 + Math.floor(Math.random() * 15),
      timestamp: Date.now(),
      metrics: [
        { title: 'Performance', value: '94', status: 'good', description: 'Speed score' },
        { title: 'SEO', value: '98', status: 'good', description: 'Meta tags' }
      ]
    });
    await ActivityEntity.create(c.env, {
      id: crypto.randomUUID(),
      type: 'crawl_end',
      message: `Finished analysis for ${url}`,
      timestamp: Date.now(),
      category: 'Page Crawler'
    });
    return ok(c, report);
  });
  // TASKS / JOBS
  app.get('/api/tasks', async (c) => {
    return ok(c, await CrawlJobEntity.list(c.env));
  });
  app.post('/api/tasks', async (c) => {
    const { domain } = await c.req.json() as { domain: string };
    const job = await CrawlJobEntity.create(c.env, {
      id: crypto.randomUUID(),
      domain,
      status: 'running',
      progress: 0,
      totalUrls: Math.floor(Math.random() * 1000) + 100,
      crawledUrls: 0,
      createdAt: Date.now()
    });
    return ok(c, job);
  });
  app.post('/api/tasks/:id/toggle', async (c) => {
    const id = c.req.param('id');
    const entity = new CrawlJobEntity(c.env, id);
    if (!await entity.exists()) return notFound(c);
    const updated = await entity.mutate(s => ({
      ...s,
      status: s.status === 'running' ? 'paused' : 'running'
    }));
    return ok(c, updated);
  });
  // ACTIVITY
  app.get('/api/activity', async (c) => {
    return ok(c, await ActivityEntity.list(c.env));
  });
}