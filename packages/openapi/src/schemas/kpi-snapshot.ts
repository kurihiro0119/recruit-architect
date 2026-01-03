import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema } from './common';
import { PhaseDataSchema } from './kpi';

export const KpiSnapshotSchema = z.object({
  id: IdSchema,
  kpiId: z.string(), // KPIのID
  snapshotDate: z.string(), // ISO 8601 date string (日付のみ)
  phaseData: z.array(PhaseDataSchema).optional(), // その日の暫定データ
  comments: z.string().optional(), // その日のコメント
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateKpiSnapshotSchema = KpiSnapshotSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateKpiSnapshotSchema = CreateKpiSnapshotSchema.partial();

export type KpiSnapshot = z.infer<typeof KpiSnapshotSchema>;
export type CreateKpiSnapshot = z.infer<typeof CreateKpiSnapshotSchema>;
export type UpdateKpiSnapshot = z.infer<typeof UpdateKpiSnapshotSchema>;

