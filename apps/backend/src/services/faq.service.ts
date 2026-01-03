import type { D1Database } from '@cloudflare/workers-types';
import type { Faq } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class FaqService extends BaseService<Faq> {
  constructor(db: D1Database) {
    super(db, 'faq');
  }
}

