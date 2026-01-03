import type { Hono } from 'hono';
import type { Env } from '../adapters/d1-db';
import { AdminService } from '../services/admin.service';
import { CreateAdminSchema, UpdateAdminSchema } from '@recruit-architect/openapi';

export function registerAdminRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/admins', async (c) => {
    const service = new AdminService(c.env.DB);
    const items = await service.getAll();
    return c.json(items);
  });

  app.get('/api/admins/:id', async (c) => {
    const id = c.req.param('id');
    const service = new AdminService(c.env.DB);
    const item = await service.getById(id);
    if (!item) {
      return c.json({ error: 'Admin not found' }, 404);
    }
    return c.json(item);
  });

  app.post('/api/admins', async (c) => {
    const body = await c.req.json();
    const parsed = CreateAdminSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: 'Invalid request body', details: parsed.error?.errors },
        400
      );
    }
    const service = new AdminService(c.env.DB);
    const item = await service.create(parsed.data);
    return c.json(item, 201);
  });

  app.put('/api/admins/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parsed = UpdateAdminSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: 'Invalid request body', details: parsed.error?.errors },
        400
      );
    }
    const service = new AdminService(c.env.DB);
    const item = await service.update(id, parsed.data);
    if (!item) {
      return c.json({ error: 'Admin not found' }, 404);
    }
    return c.json(item);
  });

  app.delete('/api/admins/:id', async (c) => {
    const id = c.req.param('id');
    const service = new AdminService(c.env.DB);
    const deleted = await service.delete(id);
    if (!deleted) {
      return c.json({ error: 'Admin not found' }, 404);
    }
    return c.json({ success: true });
  });
}

