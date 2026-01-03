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
  HistoryEntry,
} from '@recruit-architect/openapi';

export interface Database {
  kpis: Map<string, Kpi>;
  initiatives: Map<string, Initiative>;
  companyAnalyses: Map<string, CompanyAnalysis>;
  jobPostings: Map<string, JobPosting>;
  jobRoles: Map<string, JobRole>;
  competitorJobs: Map<string, CompetitorJob>;
  organizations: Map<string, Organization>;
  selectionProcesses: Map<string, SelectionProcess>;
  recruitmentChannels: Map<string, RecruitmentChannel>;
  faqs: Map<string, Faq>;
  history: HistoryEntry[];
}

export const db: Database = {
  kpis: new Map(),
  initiatives: new Map(),
  companyAnalyses: new Map(),
  jobPostings: new Map(),
  jobRoles: new Map(),
  competitorJobs: new Map(),
  organizations: new Map(),
  selectionProcesses: new Map(),
  recruitmentChannels: new Map(),
  faqs: new Map(),
  history: [],
};

export function addHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  const historyEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  db.history.push(historyEntry);
}

export function getHistory(entityId?: string, entityType?: string): HistoryEntry[] {
  let result = db.history;
  if (entityId) {
    result = result.filter((h) => h.entityId === entityId);
  }
  if (entityType) {
    result = result.filter((h) => h.entityType === entityType);
  }
  return result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
