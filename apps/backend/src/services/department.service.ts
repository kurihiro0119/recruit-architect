import type { D1Database } from '@cloudflare/workers-types';
import type { Department } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class DepartmentService extends BaseService<Department> {
  constructor(db: D1Database) {
    super(db, 'department');
  }
}

