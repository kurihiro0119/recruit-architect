import { z } from 'zod';
export declare const InitiativeStatusSchema: z.ZodEnum<["planned", "in_progress", "completed", "on_hold"]>;
export declare const InitiativeSchema: z.ZodObject<{
    id: z.ZodString;
    timing: z.ZodString;
    schedule: z.ZodOptional<z.ZodString>;
    milestone: z.ZodString;
    mainOwner: z.ZodString;
    outputAndGoal: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["planned", "in_progress", "completed", "on_hold"]>>;
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
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    timing: string;
    milestone: string;
    mainOwner: string;
    outputAndGoal: string;
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    schedule?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    timing: string;
    milestone: string;
    mainOwner: string;
    outputAndGoal: string;
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    schedule?: string | undefined;
}>;
export declare const CreateInitiativeSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    timing: z.ZodString;
    schedule: z.ZodOptional<z.ZodString>;
    milestone: z.ZodString;
    mainOwner: z.ZodString;
    outputAndGoal: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["planned", "in_progress", "completed", "on_hold"]>>;
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
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    timing: string;
    milestone: string;
    mainOwner: string;
    outputAndGoal: string;
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    schedule?: string | undefined;
}, {
    timing: string;
    milestone: string;
    mainOwner: string;
    outputAndGoal: string;
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    schedule?: string | undefined;
}>;
export declare const UpdateInitiativeSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<["planned", "in_progress", "completed", "on_hold"]>>>;
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    timing: z.ZodOptional<z.ZodString>;
    schedule: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    milestone: z.ZodOptional<z.ZodString>;
    mainOwner: z.ZodOptional<z.ZodString>;
    outputAndGoal: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    timing?: string | undefined;
    schedule?: string | undefined;
    milestone?: string | undefined;
    mainOwner?: string | undefined;
    outputAndGoal?: string | undefined;
}, {
    status?: "planned" | "in_progress" | "completed" | "on_hold" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    timing?: string | undefined;
    schedule?: string | undefined;
    milestone?: string | undefined;
    mainOwner?: string | undefined;
    outputAndGoal?: string | undefined;
}>;
export type InitiativeStatus = z.infer<typeof InitiativeStatusSchema>;
export type Initiative = z.infer<typeof InitiativeSchema>;
export type CreateInitiative = z.infer<typeof CreateInitiativeSchema>;
export type UpdateInitiative = z.infer<typeof UpdateInitiativeSchema>;
//# sourceMappingURL=initiative.d.ts.map