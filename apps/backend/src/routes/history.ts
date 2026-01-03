import { Hono } from 'hono';
import { getHistory } from '../adapters/in-memory-db';

const historyRoutes = new Hono();

historyRoutes.get('/', (c) => {
  const entityId = c.req.query('entityId');
  const entityType = c.req.query('entityType');
  const history = getHistory(entityId, entityType);
  return c.json(history);
});

export { historyRoutes };
