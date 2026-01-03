import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';
export const CompetitorJobSchema = z.object({
    id: IdSchema,
    companyName: z.string(),
    position: z.string(),
    jobUrl: z.string().url().optional(),
    highlightPoints: z.string().optional(),
    salary: z.string().optional(),
    jobDescription: z.string().optional(),
    requirements: z.string().optional(),
    notes: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateCompetitorJobSchema = CompetitorJobSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    comments: true,
});
export const UpdateCompetitorJobSchema = CreateCompetitorJobSchema.partial();
