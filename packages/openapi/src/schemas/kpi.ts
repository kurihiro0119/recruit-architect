import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const KpiTypeSchema = z.enum(['headcount', 'conversion_rate', 'timeline']);

export const KpiSchema = z.object({
  id: IdSchema,
  period: z.string(),
  phase: z.string().optional(),
  kpiType: KpiTypeSchema,
  targetValue: z.number(),
  actualValue: z.number().optional(),
  difference: z.number().optional(),
  unit: z.string().optional(),
  notes: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateKpiSchema = KpiSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  difference: true,
  comments: true,
});

export const UpdateKpiSchema = CreateKpiSchema.partial();

export type KpiType = z.infer<typeof KpiTypeSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpi = z.infer<typeof CreateKpiSchema>;
export type UpdateKpi = z.infer<typeof UpdateKpiSchema>;
