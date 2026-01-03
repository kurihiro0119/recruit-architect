import { z } from 'zod';

export const IdSchema = z.string().uuid();

export const TimestampSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const AuditSchema = z.object({
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export const CommentSchema = z.object({
  id: IdSchema,
  content: z.string(),
  authorId: z.string().optional(),
  authorName: z.string().optional(),
  createdAt: z.string().datetime(),
});

export const HistoryEntrySchema = z.object({
  id: IdSchema,
  entityId: z.string(),
  entityType: z.string(),
  action: z.enum(['create', 'update', 'delete']),
  changes: z.record(z.unknown()),
  userId: z.string().optional(),
  userName: z.string().optional(),
  timestamp: z.string().datetime(),
});

export type Id = z.infer<typeof IdSchema>;
export type Timestamp = z.infer<typeof TimestampSchema>;
export type Audit = z.infer<typeof AuditSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;
