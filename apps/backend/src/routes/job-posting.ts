import { Hono } from 'hono';
import { jobPostingService } from '../services/base-service';
import { CreateJobPostingSchema, UpdateJobPostingSchema } from '@recruit-architect/openapi';

const jobPostingRoutes = new Hono();

jobPostingRoutes.get('/', (c) => {
  const postings = jobPostingService.getAll();
  return c.json(postings);
});

jobPostingRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const posting = jobPostingService.getById(id);
  if (!posting) {
    return c.json({ error: 'Job posting not found' }, 404);
  }
  return c.json(posting);
});

jobPostingRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateJobPostingSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const posting = jobPostingService.create(parsed.data);
  return c.json(posting, 201);
});

jobPostingRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateJobPostingSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const posting = jobPostingService.update(id, parsed.data);
  if (!posting) {
    return c.json({ error: 'Job posting not found' }, 404);
  }
  return c.json(posting);
});

jobPostingRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = jobPostingService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Job posting not found' }, 404);
  }
  return c.json({ success: true });
});

export { jobPostingRoutes };
