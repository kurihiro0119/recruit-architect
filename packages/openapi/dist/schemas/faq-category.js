import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema } from './common';
export const FaqCategorySchema = z.object({
    id: IdSchema,
    name: z.string(),
    sortOrder: z.number().optional(),
    notes: z.string().optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateFaqCategorySchema = FaqCategorySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const UpdateFaqCategorySchema = CreateFaqCategorySchema.partial();
