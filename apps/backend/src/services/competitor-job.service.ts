import type { D1Database } from '@cloudflare/workers-types';
import type { CompetitorJob } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class CompetitorJobService extends BaseService<CompetitorJob> {
  constructor(db: D1Database) {
    super(db, 'competitorJob');
  }
}

