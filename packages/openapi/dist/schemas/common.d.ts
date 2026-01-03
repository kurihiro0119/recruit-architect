import { z } from 'zod';
export declare const IdSchema: z.ZodString;
export declare const TimestampSchema: z.ZodObject<{
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
}, {
    createdAt: string;
    updatedAt: string;
}>;
export declare const AuditSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
}>;
export declare const CommentSchema: z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
    authorId: z.ZodOptional<z.ZodString>;
    authorName: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    id: string;
    content: string;
    authorId?: string | undefined;
    authorName?: string | undefined;
}, {
    createdAt: string;
    id: string;
    content: string;
    authorId?: string | undefined;
    authorName?: string | undefined;
}>;
export declare const HistoryEntrySchema: z.ZodObject<{
    id: z.ZodString;
    entityId: z.ZodString;
    entityType: z.ZodString;
    action: z.ZodEnum<["create", "update", "delete"]>;
    changes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    userId: z.ZodOptional<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    entityId: string;
    entityType: string;
    action: "create" | "update" | "delete";
    changes: Record<string, unknown>;
    timestamp: string;
    userId?: string | undefined;
    userName?: string | undefined;
}, {
    id: string;
    entityId: string;
    entityType: string;
    action: "create" | "update" | "delete";
    changes: Record<string, unknown>;
    timestamp: string;
    userId?: string | undefined;
    userName?: string | undefined;
}>;
export type Id = z.infer<typeof IdSchema>;
export type Timestamp = z.infer<typeof TimestampSchema>;
export type Audit = z.infer<typeof AuditSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;
//# sourceMappingURL=common.d.ts.map