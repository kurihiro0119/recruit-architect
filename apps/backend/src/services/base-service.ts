import { db, addHistoryEntry } from '../adapters/in-memory-db';

export function createBaseService<T extends { id: string }>(
  entityType: string,
  getMap: () => Map<string, T>
) {
  return {
    getAll(): T[] {
      return Array.from(getMap().values());
    },

    getById(id: string): T | undefined {
      return getMap().get(id);
    },

    create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const entity = {
        ...data,
        id,
        createdAt: now,
        updatedAt: now,
      } as unknown as T;
      getMap().set(id, entity);
      addHistoryEntry({
        entityId: id,
        entityType,
        action: 'create',
        changes: data as Record<string, unknown>,
      });
      return entity;
    },

    update(id: string, data: Partial<T>): T | undefined {
      const existing = getMap().get(id);
      if (!existing) return undefined;

      const now = new Date().toISOString();
      const updated = {
        ...existing,
        ...data,
        id,
        updatedAt: now,
      } as T;
      getMap().set(id, updated);
      addHistoryEntry({
        entityId: id,
        entityType,
        action: 'update',
        changes: data as Record<string, unknown>,
      });
      return updated;
    },

    delete(id: string): boolean {
      const existing = getMap().get(id);
      if (!existing) return false;

      getMap().delete(id);
      addHistoryEntry({
        entityId: id,
        entityType,
        action: 'delete',
        changes: {},
      });
      return true;
    },
  };
}

export const kpiService = createBaseService('kpi', () => db.kpis);
export const initiativeService = createBaseService('initiative', () => db.initiatives);
export const companyAnalysisService = createBaseService('companyAnalysis', () => db.companyAnalyses);
export const jobPostingService = createBaseService('jobPosting', () => db.jobPostings);
export const jobRoleService = createBaseService('jobRole', () => db.jobRoles);
export const competitorJobService = createBaseService('competitorJob', () => db.competitorJobs);
export const organizationService = createBaseService('organization', () => db.organizations);
export const selectionProcessService = createBaseService('selectionProcess', () => db.selectionProcesses);
export const recruitmentChannelService = createBaseService('recruitmentChannel', () => db.recruitmentChannels);
export const faqService = createBaseService('faq', () => db.faqs);
