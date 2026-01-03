import { Hono } from 'hono';
import { faqService } from '../services/base-service';
import { CreateFaqSchema, UpdateFaqSchema } from '@recruit-architect/openapi';

const faqRoutes = new Hono();

faqRoutes.get('/', (c) => {
  const faqs = faqService.getAll();
  return c.json(faqs);
});

faqRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const faq = faqService.getById(id);
  if (!faq) {
    return c.json({ error: 'FAQ not found' }, 404);
  }
  return c.json(faq);
});

faqRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateFaqSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const faq = faqService.create(parsed.data);
  return c.json(faq, 201);
});

faqRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateFaqSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const faq = faqService.update(id, parsed.data);
  if (!faq) {
    return c.json({ error: 'FAQ not found' }, 404);
  }
  return c.json(faq);
});

faqRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = faqService.delete(id);
  if (!deleted) {
    return c.json({ error: 'FAQ not found' }, 404);
  }
  return c.json({ success: true });
});

export { faqRoutes };
