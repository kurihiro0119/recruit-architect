import type { Hono } from 'hono';
import type { CompanyAnalysis } from '@recruit-architect/openapi';
import { CreateCompanyAnalysisSchema, UpdateCompanyAnalysisSchema } from '@recruit-architect/openapi';
import type { Env } from '../adapters/d1-db';
import { CompanyAnalysisService } from '../services/company-analysis.service';
import { createCrudRoutes } from './base.routes';

export function registerCompanyAnalysisRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<CompanyAnalysis>(
    app,
    '/api/company-analyses',
    (db) => new CompanyAnalysisService(db),
    CreateCompanyAnalysisSchema,
    UpdateCompanyAnalysisSchema,
    'Company Analysis'
  );
}

