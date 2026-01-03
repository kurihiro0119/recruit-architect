import { Hono } from 'hono';
import { competitorJobService } from '../services/base-service';
import { CreateCompetitorJobSchema, UpdateCompetitorJobSchema } from '@recruit-architect/openapi';

const competitorJobRoutes = new Hono();

competitorJobRoutes.get('/', (c) => {
  const jobs = competitorJobService.getAll();
  return c.json(jobs);
});

competitorJobRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const job = competitorJobService.getById(id);
  if (!job) {
    return c.json({ error: 'Competitor job not found' }, 404);
  }
  return c.json(job);
});

competitorJobRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateCompetitorJobSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const job = competitorJobService.create(parsed.data);
  return c.json(job, 201);
});

competitorJobRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateCompetitorJobSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const job = competitorJobService.update(id, parsed.data);
  if (!job) {
    return c.json({ error: 'Competitor job not found' }, 404);
  }
  return c.json(job);
});

competitorJobRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = competitorJobService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Competitor job not found' }, 404);
  }
  return c.json({ success: true });
});

export { competitorJobRoutes };
