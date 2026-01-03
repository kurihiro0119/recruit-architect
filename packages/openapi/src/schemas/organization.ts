import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';

export const OrganizationMemberSchema = z.object({
  id: IdSchema,
  department: z.string(),
  team: z.string().optional(),
  name: z.string(),
  role: z.string().optional(),
  employmentType: z.string().optional(),
  notes: z.string().optional(),
}).merge(TimestampSchema);

export const OrganizationSchema = z.object({
  id: IdSchema,
  department: z.string(),
  role: z.string().optional(),
  headcount: z.number().optional(),
  members: z.array(OrganizationMemberSchema).optional(),
  notes: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);

export const CreateOrganizationSchema = OrganizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  comments: true,
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

export type OrganizationMember = z.infer<typeof OrganizationMemberSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
