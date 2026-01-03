import { Hono } from 'hono';
import { companyAnalysisService } from '../services/base-service';
import { CreateCompanyAnalysisSchema, UpdateCompanyAnalysisSchema } from '@recruit-architect/openapi';

const companyAnalysisRoutes = new Hono();

companyAnalysisRoutes.get('/', (c) => {
  const analyses = companyAnalysisService.getAll();
  return c.json(analyses);
});

companyAnalysisRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const analysis = companyAnalysisService.getById(id);
  if (!analysis) {
    return c.json({ error: 'Company analysis not found' }, 404);
  }
  return c.json(analysis);
});

companyAnalysisRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateCompanyAnalysisSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const analysis = companyAnalysisService.create(parsed.data);
  return c.json(analysis, 201);
});

companyAnalysisRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateCompanyAnalysisSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const analysis = companyAnalysisService.update(id, parsed.data);
  if (!analysis) {
    return c.json({ error: 'Company analysis not found' }, 404);
  }
  return c.json(analysis);
});

companyAnalysisRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = companyAnalysisService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Company analysis not found' }, 404);
  }
  return c.json({ success: true });
});

export { companyAnalysisRoutes };
