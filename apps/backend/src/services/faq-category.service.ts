import type { D1Database } from '@cloudflare/workers-types';
import type { FaqCategory } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class FaqCategoryService extends BaseService<FaqCategory> {
  constructor(db: D1Database) {
    super(db, 'faqCategory');
  }
}

