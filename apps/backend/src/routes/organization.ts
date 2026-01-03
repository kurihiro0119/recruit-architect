import { Hono } from 'hono';
import { organizationService } from '../services/base-service';
import { CreateOrganizationSchema, UpdateOrganizationSchema } from '@recruit-architect/openapi';

const organizationRoutes = new Hono();

organizationRoutes.get('/', (c) => {
  const orgs = organizationService.getAll();
  return c.json(orgs);
});

organizationRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const org = organizationService.getById(id);
  if (!org) {
    return c.json({ error: 'Organization not found' }, 404);
  }
  return c.json(org);
});

organizationRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateOrganizationSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const org = organizationService.create(parsed.data);
  return c.json(org, 201);
});

organizationRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateOrganizationSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const org = organizationService.update(id, parsed.data);
  if (!org) {
    return c.json({ error: 'Organization not found' }, 404);
  }
  return c.json(org);
});

organizationRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = organizationService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Organization not found' }, 404);
  }
  return c.json({ success: true });
});

export { organizationRoutes };
