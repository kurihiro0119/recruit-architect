import { z } from 'zod';
export declare const FaqVisibilitySchema: z.ZodEnum<["internal", "agt", "public"]>;
export declare const FaqSchema: z.ZodObject<{
    id: z.ZodString;
    category: z.ZodString;
    question: z.ZodString;
    answer: z.ZodString;
    visibility: z.ZodEnum<["internal", "agt", "public"]>;
    order: z.ZodOptional<z.ZodNumber>;
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
    category: string;
    question: string;
    answer: string;
    visibility: "internal" | "agt" | "public";
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
    order?: number | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    category: string;
    question: string;
    answer: string;
    visibility: "internal" | "agt" | "public";
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
    order?: number | undefined;
}>;
export declare const CreateFaqSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    category: z.ZodString;
    question: z.ZodString;
    answer: z.ZodString;
    visibility: z.ZodEnum<["internal", "agt", "public"]>;
    order: z.ZodOptional<z.ZodNumber>;
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
    category: string;
    question: string;
    answer: string;
    visibility: "internal" | "agt" | "public";
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    order?: number | undefined;
}, {
    category: string;
    question: string;
    answer: string;
    visibility: "internal" | "agt" | "public";
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    order?: number | undefined;
}>;
export declare const UpdateFaqSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
    question: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<["internal", "agt", "public"]>>;
    order: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    question?: string | undefined;
    answer?: string | undefined;
    visibility?: "internal" | "agt" | "public" | undefined;
    order?: number | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    category?: string | undefined;
    question?: string | undefined;
    answer?: string | undefined;
    visibility?: "internal" | "agt" | "public" | undefined;
    order?: number | undefined;
}>;
export type FaqVisibility = z.infer<typeof FaqVisibilitySchema>;
export type Faq = z.infer<typeof FaqSchema>;
export type CreateFaq = z.infer<typeof CreateFaqSchema>;
export type UpdateFaq = z.infer<typeof UpdateFaqSchema>;
//# sourceMappingURL=faq.d.ts.map