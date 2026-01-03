import type { D1Database } from '@cloudflare/workers-types';
import type { HistoryEntry } from '@recruit-architect/openapi';
import { getHistory } from '../adapters/d1-db';

export class HistoryService {
  protected db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getHistory(entityId?: string, entityType?: string): Promise<HistoryEntry[]> {
    return await getHistory(this.db, entityId, entityType);
  }
}

