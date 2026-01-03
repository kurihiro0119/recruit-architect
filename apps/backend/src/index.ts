import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createD1Service, getHistory, type Env } from './adapters/d1-db';
import type {
  Kpi,
  Initiative,
  CompanyAnalysis,
  JobPosting,
  JobRole,
  CompetitorJob,
  Organization,
  SelectionProcess,
  RecruitmentChannel,
  Faq,
} from '@recruit-architect/openapi';
import {
  CreateKpiSchema,
  UpdateKpiSchema,
  CreateInitiativeSchema,
  UpdateInitiativeSchema,
  CreateCompanyAnalysisSchema,
  UpdateCompanyAnalysisSchema,
  CreateJobPostingSchema,
  UpdateJobPostingSchema,
  CreateJobRoleSchema,
  UpdateJobRoleSchema,
  CreateCompetitorJobSchema,
  UpdateCompetitorJobSchema,
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
  CreateSelectionProcessSchema,
  UpdateSelectionProcessSchema,
  CreateRecruitmentChannelSchema,
  UpdateRecruitmentChannelSchema,
  CreateFaqSchema,
  UpdateFaqSchema,
} from '@recruit-architect/openapi';

const app = new Hono<{ Bindings: Env }>();

app.use('*', logger());
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (c) => {
  return c.json({
    name: 'Recruit Architect API',
    version: '0.0.1',
    database: 'Cloudflare D1',
    endpoints: [
      '/api/kpis',
      '/api/initiatives',
      '/api/company-analyses',
      '/api/job-postings',
      '/api/job-roles',
      '/api/competitor-jobs',
      '/api/organizations',
      '/api/selection-processes',
      '/api/recruitment-channels',
      '/api/faqs',
      '/api/history',
    ],
  });
});

// Helper function to create CRUD routes
function createCrudRoutes<T extends { id: string }>(
  basePath: string,
  entityType: 'kpi' | 'initiative' | 'companyAnalysis' | 'jobPosting' | 'jobRole' | 'competitorJob' | 'organization' | 'selectionProcess' | 'recruitmentChannel' | 'faq',
  createSchema: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: { errors: unknown[] } } },
  updateSchema: { safeParse: (data: unknown) => { success: boolean; data?: unknown; error?: { errors: unknown[] } } },
  entityName: string
) {
  app.get(basePath, async (c) => {
    const service = createD1Service<T>(c.env.DB, entityType);
    const items = await service.getAll();
    return c.json(items);
  });

  app.get(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const service = createD1Service<T>(c.env.DB, entityType);
    const item = await service.getById(id);
    if (!item) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json(item);
  });

  app.post(basePath, async (c) => {
    const body = await c.req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid request body', details: parsed.error?.errors }, 400);
    }
    const service = createD1Service<T>(c.env.DB, entityType);
    const item = await service.create(parsed.data as Omit<T, 'id' | 'createdAt' | 'updatedAt'>);
    return c.json(item, 201);
  });

  app.put(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: 'Invalid request body', details: parsed.error?.errors }, 400);
    }
    const service = createD1Service<T>(c.env.DB, entityType);
    const item = await service.update(id, parsed.data as Partial<T>);
    if (!item) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json(item);
  });

  app.delete(`${basePath}/:id`, async (c) => {
    const id = c.req.param('id');
    const service = createD1Service<T>(c.env.DB, entityType);
    const deleted = await service.delete(id);
    if (!deleted) {
      return c.json({ error: `${entityName} not found` }, 404);
    }
    return c.json({ success: true });
  });
}

// Register all CRUD routes
createCrudRoutes<Kpi>('/api/kpis', 'kpi', CreateKpiSchema, UpdateKpiSchema, 'KPI');
createCrudRoutes<Initiative>('/api/initiatives', 'initiative', CreateInitiativeSchema, UpdateInitiativeSchema, 'Initiative');
createCrudRoutes<CompanyAnalysis>('/api/company-analyses', 'companyAnalysis', CreateCompanyAnalysisSchema, UpdateCompanyAnalysisSchema, 'Company Analysis');
createCrudRoutes<JobPosting>('/api/job-postings', 'jobPosting', CreateJobPostingSchema, UpdateJobPostingSchema, 'Job Posting');
createCrudRoutes<JobRole>('/api/job-roles', 'jobRole', CreateJobRoleSchema, UpdateJobRoleSchema, 'Job Role');
createCrudRoutes<CompetitorJob>('/api/competitor-jobs', 'competitorJob', CreateCompetitorJobSchema, UpdateCompetitorJobSchema, 'Competitor Job');
createCrudRoutes<Organization>('/api/organizations', 'organization', CreateOrganizationSchema, UpdateOrganizationSchema, 'Organization');
createCrudRoutes<SelectionProcess>('/api/selection-processes', 'selectionProcess', CreateSelectionProcessSchema, UpdateSelectionProcessSchema, 'Selection Process');
createCrudRoutes<RecruitmentChannel>('/api/recruitment-channels', 'recruitmentChannel', CreateRecruitmentChannelSchema, UpdateRecruitmentChannelSchema, 'Recruitment Channel');
createCrudRoutes<Faq>('/api/faqs', 'faq', CreateFaqSchema, UpdateFaqSchema, 'FAQ');

// History routes
app.get('/api/history', async (c) => {
  const entityId = c.req.query('entityId');
  const entityType = c.req.query('entityType');
  const history = await getHistory(c.env.DB, entityId, entityType);
  return c.json(history);
});

export default app;
