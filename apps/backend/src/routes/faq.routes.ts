import type { Hono } from 'hono';
import type { Faq } from '@recruit-architect/openapi';
import { CreateFaqSchema, UpdateFaqSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { FaqService } from '../services/faq.service';
import { createCrudRoutes } from './base.routes';

export function registerFaqRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Faq>(
    app,
    '/api/faqs',
    (db) => new FaqService(db),
    CreateFaqSchema,
    UpdateFaqSchema,
    'FAQ'
  );
}

