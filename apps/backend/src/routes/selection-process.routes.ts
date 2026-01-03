import type { Hono } from 'hono';
import type { SelectionProcess } from '@recruit-architect/openapi';
import { CreateSelectionProcessSchema, UpdateSelectionProcessSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { SelectionProcessService } from '../services/selection-process.service';
import { createCrudRoutes } from './base.routes';

export function registerSelectionProcessRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<SelectionProcess>(
    app,
    '/api/selection-processes',
    (db) => new SelectionProcessService(db),
    CreateSelectionProcessSchema,
    UpdateSelectionProcessSchema,
    'Selection Process'
  );
}

