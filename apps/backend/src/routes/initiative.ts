import { Hono } from 'hono';
import { initiativeService } from '../services/base-service';
import { CreateInitiativeSchema, UpdateInitiativeSchema } from '@recruit-architect/openapi';

const initiativeRoutes = new Hono();

initiativeRoutes.get('/', (c) => {
  const initiatives = initiativeService.getAll();
  return c.json(initiatives);
});

initiativeRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const initiative = initiativeService.getById(id);
  if (!initiative) {
    return c.json({ error: 'Initiative not found' }, 404);
  }
  return c.json(initiative);
});

initiativeRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateInitiativeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const initiative = initiativeService.create(parsed.data);
  return c.json(initiative, 201);
});

initiativeRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateInitiativeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const initiative = initiativeService.update(id, parsed.data);
  if (!initiative) {
    return c.json({ error: 'Initiative not found' }, 404);
  }
  return c.json(initiative);
});

initiativeRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = initiativeService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Initiative not found' }, 404);
  }
  return c.json({ success: true });
});

export { initiativeRoutes };
