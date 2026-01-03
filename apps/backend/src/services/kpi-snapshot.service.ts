import type { D1Database } from '@cloudflare/workers-types';
import type { KpiSnapshot } from '@recruit-architect/openapi';
import { createD1Service } from '../adapters/d1-db';

export class KpiSnapshotService {
  protected db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  protected getRepository() {
    return createD1Service<KpiSnapshot>(this.db, 'kpiSnapshot');
  }

  async getAll(): Promise<KpiSnapshot[]> {
    const repository = this.getRepository();
    return await repository.getAll();
  }

  async getById(id: string): Promise<KpiSnapshot | null> {
    const repository = this.getRepository();
    return await repository.getById(id);
  }

  async create(data: Omit<KpiSnapshot, 'id' | 'createdAt' | 'updatedAt'>): Promise<KpiSnapshot> {
    const repository = this.getRepository();
    return await repository.create(data);
  }

  async update(id: string, data: Partial<KpiSnapshot>): Promise<KpiSnapshot | null> {
    const repository = this.getRepository();
    return await repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    const repository = this.getRepository();
    return await repository.delete(id);
  }

  async getByKpiId(kpiId: string): Promise<KpiSnapshot[]> {
    const repository = this.getRepository();
    const result = await this.db
      .prepare(`SELECT * FROM kpi_snapshots WHERE kpi_id = ? ORDER BY snapshot_date DESC`)
      .bind(kpiId)
      .all();
    
    // fromDbRecordを使うために、tableConfigsからjsonFieldsを取得
    const jsonFields = ['phaseData'];
    return (result.results || []).map((row) => {
      const record = row as Record<string, unknown>;
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(record)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        if (jsonFields.includes(camelKey) && typeof value === 'string') {
          try {
            result[camelKey] = JSON.parse(value);
          } catch {
            result[camelKey] = value;
          }
        } else {
          result[camelKey] = value;
        }
      }
      return result as KpiSnapshot;
    });
  }

  async getByKpiIdAndDate(kpiId: string, snapshotDate: string): Promise<KpiSnapshot | null> {
    const result = await this.db
      .prepare(`SELECT * FROM kpi_snapshots WHERE kpi_id = ? AND snapshot_date = ?`)
      .bind(kpiId, snapshotDate)
      .first();
    if (!result) return null;
    
    const record = result as Record<string, unknown>;
    const jsonFields = ['phaseData'];
    const converted: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(record)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      if (jsonFields.includes(camelKey) && typeof value === 'string') {
        try {
          converted[camelKey] = JSON.parse(value);
        } catch {
          converted[camelKey] = value;
        }
      } else {
        converted[camelKey] = value;
      }
    }
    return converted as KpiSnapshot;
  }
}

