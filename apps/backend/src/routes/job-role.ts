import { Hono } from 'hono';
import { jobRoleService } from '../services/base-service';
import { CreateJobRoleSchema, UpdateJobRoleSchema } from '@recruit-architect/openapi';

const jobRoleRoutes = new Hono();

jobRoleRoutes.get('/', (c) => {
  const roles = jobRoleService.getAll();
  return c.json(roles);
});

jobRoleRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const role = jobRoleService.getById(id);
  if (!role) {
    return c.json({ error: 'Job role not found' }, 404);
  }
  return c.json(role);
});

jobRoleRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateJobRoleSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const role = jobRoleService.create(parsed.data);
  return c.json(role, 201);
});

jobRoleRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateJobRoleSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const role = jobRoleService.update(id, parsed.data);
  if (!role) {
    return c.json({ error: 'Job role not found' }, 404);
  }
  return c.json(role);
});

jobRoleRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = jobRoleService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Job role not found' }, 404);
  }
  return c.json({ success: true });
});

export { jobRoleRoutes };
