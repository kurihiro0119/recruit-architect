import type { D1Database } from '@cloudflare/workers-types';
import type { CompanyAnalysis } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class CompanyAnalysisService extends BaseService<CompanyAnalysis> {
  constructor(db: D1Database) {
    super(db, 'companyAnalysis');
  }
}

