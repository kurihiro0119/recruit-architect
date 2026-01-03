import { Hono } from 'hono';
import { kpiService } from '../services/base-service';
import { CreateKpiSchema, UpdateKpiSchema } from '@recruit-architect/openapi';

const kpiRoutes = new Hono();

kpiRoutes.get('/', (c) => {
  const kpis = kpiService.getAll();
  return c.json(kpis);
});

kpiRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const kpi = kpiService.getById(id);
  if (!kpi) {
    return c.json({ error: 'KPI not found' }, 404);
  }
  return c.json(kpi);
});

kpiRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateKpiSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const kpi = kpiService.create(parsed.data);
  return c.json(kpi, 201);
});

kpiRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateKpiSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const kpi = kpiService.update(id, parsed.data);
  if (!kpi) {
    return c.json({ error: 'KPI not found' }, 404);
  }
  return c.json(kpi);
});

kpiRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = kpiService.delete(id);
  if (!deleted) {
    return c.json({ error: 'KPI not found' }, 404);
  }
  return c.json({ success: true });
});

export { kpiRoutes };
