import type { D1Database } from '@cloudflare/workers-types';
import type { Position } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class PositionService extends BaseService<Position> {
  constructor(db: D1Database) {
    super(db, 'position');
  }
}

