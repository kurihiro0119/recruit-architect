import type { Hono } from 'hono';
import type { Env } from '../adapters/d1-db';
import { HistoryService } from '../services/history.service';

export function registerHistoryRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/history', async (c) => {
    const entityId = c.req.query('entityId');
    const entityType = c.req.query('entityType');
    const service = new HistoryService(c.env.DB);
    const history = await service.getHistory(entityId, entityType);
    return c.json(history);
  });
}

