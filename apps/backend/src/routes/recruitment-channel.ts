import { Hono } from 'hono';
import { recruitmentChannelService } from '../services/base-service';
import { CreateRecruitmentChannelSchema, UpdateRecruitmentChannelSchema } from '@recruit-architect/openapi';

const recruitmentChannelRoutes = new Hono();

recruitmentChannelRoutes.get('/', (c) => {
  const channels = recruitmentChannelService.getAll();
  return c.json(channels);
});

recruitmentChannelRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const channel = recruitmentChannelService.getById(id);
  if (!channel) {
    return c.json({ error: 'Recruitment channel not found' }, 404);
  }
  return c.json(channel);
});

recruitmentChannelRoutes.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = CreateRecruitmentChannelSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const channel = recruitmentChannelService.create(parsed.data);
  return c.json(channel, 201);
});

recruitmentChannelRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const parsed = UpdateRecruitmentChannelSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Invalid request body', details: parsed.error.errors }, 400);
  }
  const channel = recruitmentChannelService.update(id, parsed.data);
  if (!channel) {
    return c.json({ error: 'Recruitment channel not found' }, 404);
  }
  return c.json(channel);
});

recruitmentChannelRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');
  const deleted = recruitmentChannelService.delete(id);
  if (!deleted) {
    return c.json({ error: 'Recruitment channel not found' }, 404);
  }
  return c.json({ success: true });
});

export { recruitmentChannelRoutes };
