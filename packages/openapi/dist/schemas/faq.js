import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';
export const FaqVisibilitySchema = z.enum(['internal', 'agt', 'public']);
export const FaqSchema = z.object({
    id: IdSchema,
    category: z.string(),
    question: z.string(),
    answer: z.string(),
    visibility: FaqVisibilitySchema,
    order: z.number().optional(),
    notes: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateFaqSchema = FaqSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    comments: true,
});
export const UpdateFaqSchema = CreateFaqSchema.partial();
