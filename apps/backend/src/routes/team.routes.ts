import type { Hono } from 'hono';
import type { Team } from '@recruit-architect/openapi';
import {
  CreateTeamSchema,
  UpdateTeamSchema,
} from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { TeamService } from '../services/team.service';
import { createCrudRoutes } from './base.routes';

export function registerTeamRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Team>(
    app,
    '/api/teams',
    (db) => new TeamService(db),
    CreateTeamSchema,
    UpdateTeamSchema,
    'Team'
  );
}

