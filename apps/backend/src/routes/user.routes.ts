import type { Hono } from 'hono';
import type { Env } from '../adapters/d1-db';
import { UserService } from '../services/user.service';
import { CreateUserSchema, UpdateUserSchema } from '@recruit-architect/openapi';

export function registerUserRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/users', async (c) => {
    const service = new UserService(c.env.DB);
    const organizationId = c.req.query('organizationId');
    const items = organizationId
      ? await service.getByOrganizationId(organizationId)
      : await service.getAll();
    return c.json(items);
  });

  app.get('/api/users/:id', async (c) => {
    const id = c.req.param('id');
    const service = new UserService(c.env.DB);
    const item = await service.getById(id);
    if (!item) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(item);
  });

  app.post('/api/users', async (c) => {
    const body = await c.req.json();
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: 'Invalid request body', details: parsed.error?.errors },
        400
      );
    }
    const service = new UserService(c.env.DB);
    const item = await service.create(parsed.data);
    return c.json(item, 201);
  });

  app.put('/api/users/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parsed = UpdateUserSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: 'Invalid request body', details: parsed.error?.errors },
        400
      );
    }
    const service = new UserService(c.env.DB);
    const item = await service.update(id, parsed.data);
    if (!item) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json(item);
  });

  app.delete('/api/users/:id', async (c) => {
    const id = c.req.param('id');
    const service = new UserService(c.env.DB);
    const deleted = await service.delete(id);
    if (!deleted) {
      return c.json({ error: 'User not found' }, 404);
    }
    return c.json({ success: true });
  });
}

