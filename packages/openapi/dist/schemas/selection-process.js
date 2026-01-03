import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';
export const ProcessTypeSchema = z.enum(['current', 'ideal']);
export const SelectionProcessSchema = z.object({
    id: IdSchema,
    stepNo: z.number(),
    phaseName: z.string(),
    detailedProcess: z.string().optional(),
    owner: z.string().optional(),
    requiredDays: z.number().optional(),
    processType: ProcessTypeSchema,
    notes: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateSelectionProcessSchema = SelectionProcessSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    comments: true,
});
export const UpdateSelectionProcessSchema = CreateSelectionProcessSchema.partial();
