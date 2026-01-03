import { z } from 'zod';
export declare const TargetTypeSchema: z.ZodEnum<["internal", "agt", "both"]>;
export declare const JobRoleSchema: z.ZodObject<{
    id: z.ZodString;
    jobType: z.ZodString;
    grade: z.ZodString;
    mission: z.ZodOptional<z.ZodString>;
    specificTasks: z.ZodOptional<z.ZodString>;
    targetType: z.ZodOptional<z.ZodEnum<["internal", "agt", "both"]>>;
    notes: z.ZodOptional<z.ZodString>;
    comments: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    jobType: string;
    grade: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    jobType: string;
    grade: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}>;
export declare const CreateJobRoleSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    jobType: z.ZodString;
    grade: z.ZodString;
    mission: z.ZodOptional<z.ZodString>;
    specificTasks: z.ZodOptional<z.ZodString>;
    targetType: z.ZodOptional<z.ZodEnum<["internal", "agt", "both"]>>;
    notes: z.ZodOptional<z.ZodString>;
    comments: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    jobType: string;
    grade: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}, {
    jobType: string;
    grade: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}>;
export declare const UpdateJobRoleSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    jobType: z.ZodOptional<z.ZodString>;
    grade: z.ZodOptional<z.ZodString>;
    mission: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    specificTasks: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    targetType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["internal", "agt", "both"]>>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    jobType?: string | undefined;
    grade?: string | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    jobType?: string | undefined;
    grade?: string | undefined;
    mission?: string | undefined;
    specificTasks?: string | undefined;
    targetType?: "internal" | "agt" | "both" | undefined;
}>;
export type TargetType = z.infer<typeof TargetTypeSchema>;
export type JobRole = z.infer<typeof JobRoleSchema>;
export type CreateJobRole = z.infer<typeof CreateJobRoleSchema>;
export type UpdateJobRole = z.infer<typeof UpdateJobRoleSchema>;
//# sourceMappingURL=job-role.d.ts.map