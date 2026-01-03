import type { Hono } from 'hono';
import type { Initiative } from '@recruit-architect/openapi';
import { CreateInitiativeSchema, UpdateInitiativeSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { InitiativeService } from '../services/initiative.service';
import { createCrudRoutes } from './base.routes';

export function registerInitiativeRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Initiative>(
    app,
    '/api/initiatives',
    (db) => new InitiativeService(db),
    CreateInitiativeSchema,
    UpdateInitiativeSchema,
    'Initiative'
  );
}

