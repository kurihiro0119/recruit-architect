import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';
export const TargetTypeSchema = z.enum(['internal', 'agt', 'both']);
export const JobRoleSchema = z.object({
    id: IdSchema,
    jobType: z.string(),
    grade: z.string(),
    mission: z.string().optional(),
    specificTasks: z.string().optional(),
    targetType: TargetTypeSchema.optional(),
    notes: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateJobRoleSchema = JobRoleSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    comments: true,
});
export const UpdateJobRoleSchema = CreateJobRoleSchema.partial();
