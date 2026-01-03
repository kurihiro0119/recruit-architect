import type { D1Database } from '@cloudflare/workers-types';
import type { JobPosting } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class JobPostingService extends BaseService<JobPosting> {
  constructor(db: D1Database) {
    super(db, 'jobPosting');
  }
}

