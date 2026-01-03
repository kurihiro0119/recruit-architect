import type { Hono } from 'hono';
import type { JobRole } from '@recruit-architect/openapi';
import { CreateJobRoleSchema, UpdateJobRoleSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { JobRoleService } from '../services/job-role.service';
import { createCrudRoutes } from './base.routes';

export function registerJobRoleRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<JobRole>(
    app,
    '/api/job-roles',
    (db) => new JobRoleService(db),
    CreateJobRoleSchema,
    UpdateJobRoleSchema,
    'Job Role'
  );
}

