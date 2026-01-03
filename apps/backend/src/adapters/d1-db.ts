import type { D1Database } from '@cloudflare/workers-types';
import type {
  Kpi,
  KpiSnapshot,
  Initiative,
  CompanyAnalysis,
  JobPosting,
  JobRole,
  CompetitorJob,
  Organization,
  Department,
  Team,
  Position,
  OrganizationMember,
  SelectionProcess,
  RecruitmentChannel,
  Faq,
  FaqCategory,
  HistoryEntry,
} from '@recruit-architect/openapi';

// Helper to convert camelCase to snake_case
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

// Helper to convert snake_case to camelCase
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Convert object keys from camelCase to snake_case for DB insert/update
function toDbRecord(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = toSnakeCase(key);
    // undefinedの値は除外（部分更新時に既存フィールドを保持するため）
    if (value === undefined) {
      continue;
    }
    // nullや空配列も含めて保存
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      result[snakeKey] = JSON.stringify(value);
    } else {
      result[snakeKey] = value;
    }
  }
  return result;
}

// Convert DB record to entity with camelCase keys
function fromDbRecord<T>(record: Record<string, unknown>, jsonFields: string[] = []): T {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    const camelKey = toCamelCase(key);
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
  return result as T;
}

// Table configurations with JSON fields
const tableConfigs: Record<string, { tableName: string; jsonFields: string[] }> = {
  kpi: { tableName: 'kpis', jsonFields: ['phaseData', 'comments'] },
  kpiSnapshot: { tableName: 'kpi_snapshots', jsonFields: ['phaseData'] },
  initiative: { tableName: 'initiatives', jsonFields: ['comments'] },
  companyAnalysis: {
    tableName: 'company_analyses',
    jsonFields: [
      'competitors',
      'companyPosition',
      'competitorStrategies',
      'industryPlayerCharacteristics',
      'externalInternalAnalysis',
      'marketResearch',
      'competitiveAdvantage',
      'futureMarketOutlook',
      'comments',
    ],
  },
  jobPosting: { tableName: 'job_postings', jsonFields: ['revisions', 'comments'] },
  jobRole: { tableName: 'job_roles', jsonFields: ['comments'] },
  competitorJob: { tableName: 'competitor_jobs', jsonFields: ['comments'] },
  organization: { tableName: 'organizations', jsonFields: [] },
  department: { tableName: 'departments', jsonFields: [] },
  team: { tableName: 'teams', jsonFields: [] },
  position: { tableName: 'positions', jsonFields: [] },
  organizationMember: { tableName: 'organization_members', jsonFields: [] },
  selectionProcess: { tableName: 'selection_processes', jsonFields: ['comments'] },
  recruitmentChannel: { tableName: 'recruitment_channels', jsonFields: ['targetJobTypes', 'comments'] },
  faq: { tableName: 'faqs', jsonFields: ['comments'] },
  faqCategory: { tableName: 'faq_categories', jsonFields: [] },
};

export function createD1Service<T extends { id: string }>(
  db: D1Database,
  entityType: keyof typeof tableConfigs
) {
  const config = tableConfigs[entityType];
  const { tableName, jsonFields } = config;

  return {
    async getAll(): Promise<T[]> {
      const result = await db.prepare(`SELECT * FROM ${tableName} ORDER BY created_at DESC`).all();
      return (result.results || []).map((row) => fromDbRecord<T>(row as Record<string, unknown>, jsonFields));
    },

    async getById(id: string): Promise<T | null> {
      const result = await db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`).bind(id).first();
      if (!result) return null;
      return fromDbRecord<T>(result as Record<string, unknown>, jsonFields);
    },

    async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const entity = {
        ...data,
        id,
        createdAt: now,
        updatedAt: now,
      };

      const dbRecord = toDbRecord(entity as Record<string, unknown>);
      const columns = Object.keys(dbRecord);
      const placeholders = columns.map(() => '?').join(', ');
      const values = Object.values(dbRecord);

      await db
        .prepare(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`)
        .bind(...values)
        .run();

      // Add history entry
      await addHistoryEntry(db, {
        entityId: id,
        entityType: entityType as string,
        action: 'create',
        changes: data as Record<string, unknown>,
      });

      return entity as unknown as T;
    },

    async update(id: string, data: Partial<T>): Promise<T | null> {
      const existing = await this.getById(id);
      if (!existing) return null;

      const now = new Date().toISOString();
      const updated = {
        ...existing,
        ...data,
        id,
        updatedAt: now,
      };

      const dbRecord = toDbRecord(updated as Record<string, unknown>);
      const setClause = Object.keys(dbRecord)
        .filter((k) => k !== 'id')
        .map((k) => `${k} = ?`)
        .join(', ');
      const values = Object.entries(dbRecord)
        .filter(([k]) => k !== 'id')
        .map(([, v]) => v);

      await db
        .prepare(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`)
        .bind(...values, id)
        .run();

      // Add history entry
      await addHistoryEntry(db, {
        entityId: id,
        entityType: entityType as string,
        action: 'update',
        changes: data as Record<string, unknown>,
      });

      // 更新後のデータをDBから再取得して返す（JSONフィールドが正しくパースされるように）
      const updatedRecord = await this.getById(id);
      if (updatedRecord) {
        return updatedRecord;
      }

      return updated as T;
    },

    async delete(id: string): Promise<boolean> {
      const existing = await this.getById(id);
      if (!existing) return false;

      await db.prepare(`DELETE FROM ${tableName} WHERE id = ?`).bind(id).run();

      // Add history entry
      await addHistoryEntry(db, {
        entityId: id,
        entityType: entityType as string,
        action: 'delete',
        changes: {},
      });

      return true;
    },
  };
}

async function addHistoryEntry(
  db: D1Database,
  entry: Omit<HistoryEntry, 'id' | 'timestamp'>
): Promise<void> {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO history (id, entity_id, entity_type, action, changes, user_id, user_name, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      entry.entityId,
      entry.entityType,
      entry.action,
      JSON.stringify(entry.changes),
      entry.userId || null,
      entry.userName || null,
      timestamp
    )
    .run();
}

export async function getHistory(
  db: D1Database,
  entityId?: string,
  entityType?: string
): Promise<HistoryEntry[]> {
  let query = 'SELECT * FROM history';
  const conditions: string[] = [];
  const params: string[] = [];

  if (entityId) {
    conditions.push('entity_id = ?');
    params.push(entityId);
  }
  if (entityType) {
    conditions.push('entity_type = ?');
    params.push(entityType);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY timestamp DESC';

  const stmt = db.prepare(query);
  const result = params.length > 0 ? await stmt.bind(...params).all() : await stmt.all();

  return (result.results || []).map((row) => {
    const record = row as Record<string, unknown>;
    return {
      id: record.id as string,
      entityId: record.entity_id as string,
      entityType: record.entity_type as string,
      action: record.action as 'create' | 'update' | 'delete',
      changes: typeof record.changes === 'string' ? JSON.parse(record.changes) : record.changes,
      userId: record.user_id as string | undefined,
      userName: record.user_name as string | undefined,
      timestamp: record.timestamp as string,
    } as HistoryEntry;
  });
}

// Type definitions for Cloudflare Workers bindings
export interface Env {
  DB: D1Database;
}
