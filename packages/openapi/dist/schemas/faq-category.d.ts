import { z } from 'zod';
export declare const FaqCategorySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
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
    name: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    sortOrder?: number | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const CreateFaqCategorySchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    name: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    sortOrder?: number | undefined;
}, {
    name: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const UpdateFaqCategorySchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    name?: string | undefined;
    sortOrder?: number | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    name?: string | undefined;
    sortOrder?: number | undefined;
}>;
export type FaqCategory = z.infer<typeof FaqCategorySchema>;
export type CreateFaqCategory = z.infer<typeof CreateFaqCategorySchema>;
export type UpdateFaqCategory = z.infer<typeof UpdateFaqCategorySchema>;
//# sourceMappingURL=faq-category.d.ts.map