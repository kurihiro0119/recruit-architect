import type { D1Database } from '@cloudflare/workers-types';
import type { Kpi } from '@recruit-architect/openapi';
import { BaseService } from './base.service';

export class KpiService extends BaseService<Kpi> {
  constructor(db: D1Database) {
    super(db, 'kpi');
  }

  // 将来的にビジネスロジックを追加可能
  // 例: 特定の期間のKPIのみ取得、計算ロジックなど
}

