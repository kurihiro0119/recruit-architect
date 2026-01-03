import type { D1Database } from '@cloudflare/workers-types';
import type { Team } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class TeamService extends BaseService<Team> {
  constructor(db: D1Database) {
    super(db, 'team');
  }
}

