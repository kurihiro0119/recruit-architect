import type { D1Database } from '@cloudflare/workers-types';
import type { OrganizationMember } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class OrganizationMemberService extends BaseService<OrganizationMember> {
  constructor(db: D1Database) {
    super(db, 'organizationMember');
  }
}

