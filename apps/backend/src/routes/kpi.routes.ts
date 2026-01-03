import type { Hono } from 'hono';
import type { Kpi } from '@recruit-architect/openapi';
import { CreateKpiSchema, UpdateKpiSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { KpiService } from '../services/kpi.service';
import { createCrudRoutes } from './base.routes';

export function registerKpiRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Kpi>(
    app,
    '/api/kpis',
    (db) => new KpiService(db),
    CreateKpiSchema,
    UpdateKpiSchema,
    'KPI'
  );
}

