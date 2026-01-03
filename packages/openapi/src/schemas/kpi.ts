import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const PhaseDataSchema = z.object({
  phaseName: z.string(),
  targetValue: z.number().optional(),
  actualValue: z.number().optional(),
});

export const KpiSchema = z.object({
  id: IdSchema,
  periodStart: z.string(), // ISO 8601 date string
  periodEnd: z.string(), // ISO 8601 date string
  phase: z.string().optional(),
  notes: z.string().optional(),
  phaseData: z.array(PhaseDataSchema).optional(),
  comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateKpiSchema = KpiSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  comments: true,
});

export const UpdateKpiSchema = CreateKpiSchema.partial();

export type PhaseData = z.infer<typeof PhaseDataSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpi = z.infer<typeof CreateKpiSchema>;
export type UpdateKpi = z.infer<typeof UpdateKpiSchema>;
