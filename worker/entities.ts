import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, SeoReport, CrawlJob, ActivityEntry } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
export class SeoReportEntity extends IndexedEntity<SeoReport> {
  static readonly entityName = "seo-report";
  static readonly indexName = "seo-reports";
  static readonly initialState: SeoReport = { id: "", url: "", metrics: [], score: 0, timestamp: 0 };
}
export class CrawlJobEntity extends IndexedEntity<CrawlJob> {
  static readonly entityName = "crawl-job";
  static readonly indexName = "crawl-jobs";
  static readonly initialState: CrawlJob = { 
    id: "", domain: "", status: 'paused', progress: 0, totalUrls: 0, crawledUrls: 0, createdAt: 0 
  };
}
export class ActivityEntity extends IndexedEntity<ActivityEntry> {
  static readonly entityName = "activity";
  static readonly indexName = "activities";
  static readonly initialState: ActivityEntry = { 
    id: "", type: 'system', message: "", timestamp: 0, category: "System" 
  };
}