import type { D1Database } from '@cloudflare/workers-types';
import type { SelectionProcess } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class SelectionProcessService extends BaseService<SelectionProcess> {
  constructor(db: D1Database) {
    super(db, 'selectionProcess');
  }
}

