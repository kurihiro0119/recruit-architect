import type { Hono } from 'hono';
import type { KpiSnapshot } from '@recruit-architect/openapi';
import { CreateKpiSnapshotSchema, UpdateKpiSnapshotSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { KpiSnapshotService } from '../services/kpi-snapshot.service';
import { createCrudRoutes } from './base.routes';

export function registerKpiSnapshotRoutes(app: Hono<{ Bindings: Env }>) {
  const basePath = '/api/kpi-snapshots';
  
  // CRUD routes
  createCrudRoutes<KpiSnapshot>(
    app,
    basePath,
    (db) => new KpiSnapshotService(db),
    CreateKpiSnapshotSchema,
    UpdateKpiSnapshotSchema,
    'KPI Snapshot'
  );

  // Get snapshots by KPI ID
  app.get(`${basePath}/kpi/:kpiId`, async (c) => {
    const kpiId = c.req.param('kpiId');
    const service = new KpiSnapshotService(c.env.DB);
    const snapshots = await service.getByKpiId(kpiId);
    return c.json(snapshots);
  });
}

