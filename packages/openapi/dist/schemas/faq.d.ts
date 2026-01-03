import { z } from 'zod';
export declare const FaqVisibilitySchema: z.ZodEnum<["internal", "agt", "public"]>;
export declare const FaqSchema: z.ZodObject<{
    id: z.ZodString;
    categoryId: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
    answer: z.ZodOptional<z.ZodString>;
    visibility: z.ZodEnum<["internal", "agt", "public"]>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
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
    categoryId: string;
    question: string;
    visibility: "internal" | "agt" | "public";
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
    category?: string | undefined;
    answer?: string | undefined;
    sortOrder?: number | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    categoryId: string;
    question: string;
    visibility: "internal" | "agt" | "public";
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
    category?: string | undefined;
    answer?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const CreateFaqSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    categoryId: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
    answer: z.ZodOptional<z.ZodString>;
    visibility: z.ZodEnum<["internal", "agt", "public"]>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
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
    categoryId: string;
    question: string;
    visibility: "internal" | "agt" | "public";
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    answer?: string | undefined;
    sortOrder?: number | undefined;
}, {
    categoryId: string;
    question: string;
    visibility: "internal" | "agt" | "public";
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    answer?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const UpdateFaqSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    question: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodEnum<["internal", "agt", "public"]>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    categoryId?: string | undefined;
    question?: string | undefined;
    answer?: string | undefined;
    visibility?: "internal" | "agt" | "public" | undefined;
    sortOrder?: number | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    categoryId?: string | undefined;
    question?: string | undefined;
    answer?: string | undefined;
    visibility?: "internal" | "agt" | "public" | undefined;
    sortOrder?: number | undefined;
}>;
export type FaqVisibility = z.infer<typeof FaqVisibilitySchema>;
export type Faq = z.infer<typeof FaqSchema>;
export type CreateFaq = z.infer<typeof CreateFaqSchema>;
export type UpdateFaq = z.infer<typeof UpdateFaqSchema>;
//# sourceMappingURL=faq.d.ts.map