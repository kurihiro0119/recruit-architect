import type { Hono } from 'hono';
import type { RecruitmentChannel } from '@recruit-architect/openapi';
import { CreateRecruitmentChannelSchema, UpdateRecruitmentChannelSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { RecruitmentChannelService } from '../services/recruitment-channel.service';
import { createCrudRoutes } from './base.routes';

export function registerRecruitmentChannelRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<RecruitmentChannel>(
    app,
    '/api/recruitment-channels',
    (db) => new RecruitmentChannelService(db),
    CreateRecruitmentChannelSchema,
    UpdateRecruitmentChannelSchema,
    'Recruitment Channel'
  );
}

