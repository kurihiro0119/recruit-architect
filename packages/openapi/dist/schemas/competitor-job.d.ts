import { z } from 'zod';
export declare const CompetitorJobSchema: z.ZodObject<{
    id: z.ZodString;
    companyName: z.ZodString;
    position: z.ZodString;
    jobUrl: z.ZodOptional<z.ZodString>;
    highlightPoints: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodString>;
    jobDescription: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
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
    companyName: string;
    position: string;
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
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    companyName: string;
    position: string;
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
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}>;
export declare const CreateCompetitorJobSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    companyName: z.ZodString;
    position: z.ZodString;
    jobUrl: z.ZodOptional<z.ZodString>;
    highlightPoints: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodString>;
    jobDescription: z.ZodOptional<z.ZodString>;
    requirements: z.ZodOptional<z.ZodString>;
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
    companyName: string;
    position: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}, {
    companyName: string;
    position: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}>;
export declare const UpdateCompetitorJobSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    companyName: z.ZodOptional<z.ZodString>;
    position: z.ZodOptional<z.ZodString>;
    jobDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    salary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    jobUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    highlightPoints: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    requirements: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    companyName?: string | undefined;
    position?: string | undefined;
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    companyName?: string | undefined;
    position?: string | undefined;
    jobDescription?: string | undefined;
    salary?: string | undefined;
    jobUrl?: string | undefined;
    highlightPoints?: string | undefined;
    requirements?: string | undefined;
}>;
export type CompetitorJob = z.infer<typeof CompetitorJobSchema>;
export type CreateCompetitorJob = z.infer<typeof CreateCompetitorJobSchema>;
export type UpdateCompetitorJob = z.infer<typeof UpdateCompetitorJobSchema>;
//# sourceMappingURL=competitor-job.d.ts.map