import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const InitiativeStatusSchema = z.enum(['planned', 'in_progress', 'completed', 'on_hold']);

export const InitiativeSchema = z.object({
  id: IdSchema,
  timingStart: z.string(), // ISO 8601 date string
  timingEnd: z.string().optional(), // ISO 8601 date string
  schedule: z.string().optional(),
  milestone: z.string(),
  mainOwner: z.string(),
  outputAndGoal: z.string(),
  status: InitiativeStatusSchema.optional(),
  notes: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateInitiativeSchema = InitiativeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  comments: true,
});

export const UpdateInitiativeSchema = CreateInitiativeSchema.partial();

export type InitiativeStatus = z.infer<typeof InitiativeStatusSchema>;
export type Initiative = z.infer<typeof InitiativeSchema>;
export type CreateInitiative = z.infer<typeof CreateInitiativeSchema>;
export type UpdateInitiative = z.infer<typeof UpdateInitiativeSchema>;
