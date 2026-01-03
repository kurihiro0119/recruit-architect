import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const JobPostingStatusSchema = z.enum(['draft', 'under_review', 'published', 'closed']);

export const JobRevisionSchema = z.object({
  id: IdSchema,
  version: z.number(),
  content: z.string(),
  reason: z.string().optional(),
  createdAt: z.string().datetime(),
  createdBy: z.string().optional(),
});

export const JobPostingSchema = z.object({
  id: IdSchema,
  positionName: z.string(),
  recruitmentBackground: z.string().optional(),
  jobDescription: z.string().optional(),
  requiredQualifications: z.string().optional(),
  preferredQualifications: z.string().optional(),
  salary: z.string().optional(),
  workLocation: z.string().optional(),
  employmentType: z.string().optional(),
  status: JobPostingStatusSchema,
  revisions: z.array(JobRevisionSchema).optional(),
  notes: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateJobPostingSchema = JobPostingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  revisions: true,
  comments: true,
});

export const UpdateJobPostingSchema = CreateJobPostingSchema.partial();

export type JobPostingStatus = z.infer<typeof JobPostingStatusSchema>;
export type JobRevision = z.infer<typeof JobRevisionSchema>;
export type JobPosting = z.infer<typeof JobPostingSchema>;
export type CreateJobPosting = z.infer<typeof CreateJobPostingSchema>;
export type UpdateJobPosting = z.infer<typeof UpdateJobPostingSchema>;
