import type { Hono } from 'hono';
import type { CompetitorJob } from '@recruit-architect/openapi';
import { CreateCompetitorJobSchema, UpdateCompetitorJobSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { CompetitorJobService } from '../services/competitor-job.service';
import { createCrudRoutes } from './base.routes';

export function registerCompetitorJobRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<CompetitorJob>(
    app,
    '/api/competitor-jobs',
    (db) => new CompetitorJobService(db),
    CreateCompetitorJobSchema,
    UpdateCompetitorJobSchema,
    'Competitor Job'
  );
}

