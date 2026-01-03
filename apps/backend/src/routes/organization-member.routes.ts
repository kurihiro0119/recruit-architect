import type { Hono } from 'hono';
import type { OrganizationMember } from '@recruit-architect/openapi';
import {
  CreateOrganizationMemberSchema,
  UpdateOrganizationMemberSchema,
} from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { OrganizationMemberService } from '../services/organization-member.service';
import { createCrudRoutes } from './base.routes';

export function registerOrganizationMemberRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<OrganizationMember>(
    app,
    '/api/organization-members',
    (db) => new OrganizationMemberService(db),
    CreateOrganizationMemberSchema,
    UpdateOrganizationMemberSchema,
    'OrganizationMember'
  );
}

