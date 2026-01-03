import type { Hono } from 'hono';
import type { JobPosting } from '@recruit-architect/openapi';
import { CreateJobPostingSchema, UpdateJobPostingSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { JobPostingService } from '../services/job-posting.service';
import { createCrudRoutes } from './base.routes';

export function registerJobPostingRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<JobPosting>(
    app,
    '/api/job-postings',
    (db) => new JobPostingService(db),
    CreateJobPostingSchema,
    UpdateJobPostingSchema,
    'Job Posting'
  );
}

