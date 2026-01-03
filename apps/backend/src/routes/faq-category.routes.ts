import type { Hono } from 'hono';
import type { FaqCategory } from '@recruit-architect/openapi';
import { CreateFaqCategorySchema, UpdateFaqCategorySchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { FaqCategoryService } from '../services/faq-category.service';
import { createCrudRoutes } from './base.routes';

export function registerFaqCategoryRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<FaqCategory>(
    app,
    '/api/faq-categories',
    (db) => new FaqCategoryService(db),
    CreateFaqCategorySchema,
    UpdateFaqCategorySchema,
    'FAQ Category'
  );
}

