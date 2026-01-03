import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema, CommentSchema } from './common';
export const RecruitmentChannelSchema = z.object({
    id: IdSchema,
    channelName: z.string(),
    characteristics: z.string().optional(),
    targetJobTypes: z.array(z.string()).optional(),
    cost: z.string().optional(),
    effectiveness: z.string().optional(),
    notes: z.string().optional(),
    comments: z.array(CommentSchema).optional(),
}).merge(TimestampSchema).merge(AuditSchema);
export const CreateRecruitmentChannelSchema = RecruitmentChannelSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    comments: true,
});
export const UpdateRecruitmentChannelSchema = CreateRecruitmentChannelSchema.partial();
