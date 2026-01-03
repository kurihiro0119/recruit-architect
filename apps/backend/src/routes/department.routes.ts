import type { Hono } from 'hono';
import type { Department } from '@recruit-architect/openapi';
import {
  CreateDepartmentSchema,
  UpdateDepartmentSchema,
} from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { DepartmentService } from '../services/department.service';
import { createCrudRoutes } from './base.routes';

export function registerDepartmentRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Department>(
    app,
    '/api/departments',
    (db) => new DepartmentService(db),
    CreateDepartmentSchema,
    UpdateDepartmentSchema,
    'Department'
  );
}

