import { create } from 'zustand';
import type { SeoReport, CrawlJob, ActivityEntry } from '@shared/types';
import { api } from './api-client';
interface SEOStore {
  activeReport: SeoReport | null;
  tasks: CrawlJob[];
  activities: ActivityEntry[];
  isAnalyzing: boolean;
  fetchTasks: () => Promise<void>;
  fetchActivities: () => Promise<void>;
  analyzePage: (url: string) => Promise<void>;
  createTask: (domain: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
}
export const useSEOStore = create<SEOStore>((set, get) => ({
  activeReport: null,
  tasks: [],
  activities: [],
  isAnalyzing: false,
  fetchTasks: async () => {
    try {
      const data = await api<{ items: CrawlJob[] }>('/api/tasks');
      set({ tasks: data.items });
    } catch (e) {
      console.error('Failed to fetch tasks', e);
    }
  },
  fetchActivities: async () => {
    try {
      const data = await api<{ items: ActivityEntry[] }>('/api/activity');
      set({ activities: data.items });
    } catch (e) {
      console.error('Failed to fetch activity', e);
    }
  },
  analyzePage: async (url: string) => {
    set({ isAnalyzing: true });
    try {
      const report = await api<SeoReport>('/api/reports/analyze', {
        method: 'POST',
        body: JSON.stringify({ url })
      });
      set({ activeReport: report });
    } catch (e) {
      console.error('Analysis failed', e);
    } finally {
      set({ isAnalyzing: false });
    }
  },
  createTask: async (domain: string) => {
    try {
      const job = await api<CrawlJob>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ domain })
      });
      set(state => ({ tasks: [job, ...state.tasks] }));
    } catch (e) {
      console.error('Task creation failed', e);
    }
  },
  toggleTask: async (id: string) => {
    try {
      const updated = await api<CrawlJob>(`/api/tasks/${id}/toggle`, { method: 'POST' });
      set(state => ({
        tasks: state.tasks.map(t => t.id === id ? updated : t)
      }));
    } catch (e) {
      console.error('Toggle failed', e);
    }
  }
}));