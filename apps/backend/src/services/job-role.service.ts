import type { D1Database } from '@cloudflare/workers-types';
import type { JobRole } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class JobRoleService extends BaseService<JobRole> {
  constructor(db: D1Database) {
    super(db, 'jobRole');
  }
}

