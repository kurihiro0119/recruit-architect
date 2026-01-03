import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { kpiRoutes } from './routes/kpi';
import { initiativeRoutes } from './routes/initiative';
import { companyAnalysisRoutes } from './routes/company-analysis';
import { jobPostingRoutes } from './routes/job-posting';
import { jobRoleRoutes } from './routes/job-role';
import { competitorJobRoutes } from './routes/competitor-job';
import { organizationRoutes } from './routes/organization';
import { selectionProcessRoutes } from './routes/selection-process';
import { recruitmentChannelRoutes } from './routes/recruitment-channel';
import { faqRoutes } from './routes/faq';
import { historyRoutes } from './routes/history';

const app = new Hono();

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

app.route('/api/kpis', kpiRoutes);
app.route('/api/initiatives', initiativeRoutes);
app.route('/api/company-analyses', companyAnalysisRoutes);
app.route('/api/job-postings', jobPostingRoutes);
app.route('/api/job-roles', jobRoleRoutes);
app.route('/api/competitor-jobs', competitorJobRoutes);
app.route('/api/organizations', organizationRoutes);
app.route('/api/selection-processes', selectionProcessRoutes);
app.route('/api/recruitment-channels', recruitmentChannelRoutes);
app.route('/api/faqs', faqRoutes);
app.route('/api/history', historyRoutes);

export default app;
