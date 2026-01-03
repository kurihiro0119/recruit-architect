import type { Hono } from 'hono';
import type { D1Database } from '@cloudflare/workers-types';
import type { Env } from '../adapters/d1-db';
import type { BaseService } from '../services/base.service';

export function createCrudRoutes<T extends { id: string }>(
  app: Hono<{ Bindings: Env }>,
  basePath: string,
  serviceFactory: (db: D1Database) => BaseService<T>,
  createSchema: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: { errors: unknown[] } } },
  updateSchema: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: { errors: unknown[] } } },
  entityName: string
) {
  app.get(basePath, async (c) => {
    const service = serviceFactory(c.env.DB);
    const items = await service.getAll();
    return c.json(items);
  });

  app.get(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const service = serviceFactory(c.env.DB);
    const item = await service.getById(id);
    if (!item) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json(item);
  });

  app.post(basePath, async (c) => {
    const body = await c.req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid request body', details: parsed.error?.errors }, 400);
    }
    const service = serviceFactory(c.env.DB);
    const item = await service.create(parsed.data as Omit<T, 'id' | 'createdAt' | 'updatedAt'>);
    return c.json(item, 201);
  });

  app.put(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid request body', details: parsed.error?.errors }, 400);
    }
    const service = serviceFactory(c.env.DB);
    const item = await service.update(id, parsed.data as Partial<T>);
    if (!item) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json(item);
  });

  app.delete(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const service = serviceFactory(c.env.DB);
    const deleted = await service.delete(id);
    if (!deleted) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json({ success: true });
  });
}

