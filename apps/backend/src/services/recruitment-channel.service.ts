import type { D1Database } from '@cloudflare/workers-types';
import type { RecruitmentChannel } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class RecruitmentChannelService extends BaseService<RecruitmentChannel> {
  constructor(db: D1Database) {
    super(db, 'recruitmentChannel');
  }
}

