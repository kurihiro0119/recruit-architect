import type { Hono } from 'hono';
import type { Position } from '@recruit-architect/openapi';
import {
  CreatePositionSchema,
  UpdatePositionSchema,
} from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { PositionService } from '../services/position.service';
import { createCrudRoutes } from './base.routes';

export function registerPositionRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Position>(
    app,
    '/api/positions',
    (db) => new PositionService(db),
    CreatePositionSchema,
    UpdatePositionSchema,
    'Position'
  );
}

