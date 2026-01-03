import { Hono } from 'hono';
import { selectionProcessService } from '../services/base-service';
import { CreateSelectionProcessSchema, UpdateSelectionProcessSchema } from '@recruit-architect/openapi';

const selectionProcessRoutes = new Hono();

selectionProcessRoutes.get('/', (c) => {
  const processes = selectionProcessService.getAll();
  return c.json(processes);
});

selectionProcessRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const process = selectionProcessService.getById(id);
  if (!process) {
    return c.json({ error: 'Selection process not found' }, 404);
  }
  return c.json(process);
});

selectionProcessRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateSelectionProcessSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const process = selectionProcessService.create(parsed.data);
  return c.json(process, 201);
});

selectionProcessRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateSelectionProcessSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const process = selectionProcessService.update(id, parsed.data);
  if (!process) {
    return c.json({ error: 'Selection process not found' }, 404);
  }
  return c.json(process);
});

selectionProcessRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = selectionProcessService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Selection process not found' }, 404);
  }
  return c.json({ success: true });
});

export { selectionProcessRoutes };
