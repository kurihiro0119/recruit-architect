import { z } from 'zod';
export declare const KpiTypeSchema: z.ZodEnum<["headcount", "conversion_rate", "timeline"]>;
export declare const KpiSchema: z.ZodObject<{
    id: z.ZodString;
    period: z.ZodString;
    phase: z.ZodOptional<z.ZodString>;
    kpiType: z.ZodEnum<["headcount", "conversion_rate", "timeline"]>;
    targetValue: z.ZodNumber;
    actualValue: z.ZodOptional<z.ZodNumber>;
    difference: z.ZodOptional<z.ZodNumber>;
    unit: z.ZodOptional<z.ZodString>;
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
    period: string;
    kpiType: "headcount" | "conversion_rate" | "timeline";
    targetValue: number;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phase?: string | undefined;
    actualValue?: number | undefined;
    difference?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    period: string;
    kpiType: "headcount" | "conversion_rate" | "timeline";
    targetValue: number;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phase?: string | undefined;
    actualValue?: number | undefined;
    difference?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
}>;
export declare const CreateKpiSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    period: z.ZodString;
    phase: z.ZodOptional<z.ZodString>;
    kpiType: z.ZodEnum<["headcount", "conversion_rate", "timeline"]>;
    targetValue: z.ZodNumber;
    actualValue: z.ZodOptional<z.ZodNumber>;
    difference: z.ZodOptional<z.ZodNumber>;
    unit: z.ZodOptional<z.ZodString>;
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
}, "createdAt" | "updatedAt" | "id" | "difference" | "comments">, "strip", z.ZodTypeAny, {
    period: string;
    kpiType: "headcount" | "conversion_rate" | "timeline";
    targetValue: number;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phase?: string | undefined;
    actualValue?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
}, {
    period: string;
    kpiType: "headcount" | "conversion_rate" | "timeline";
    targetValue: number;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phase?: string | undefined;
    actualValue?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
}>;
export declare const UpdateKpiSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    period: z.ZodOptional<z.ZodString>;
    phase: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpiType: z.ZodOptional<z.ZodEnum<["headcount", "conversion_rate", "timeline"]>>;
    targetValue: z.ZodOptional<z.ZodNumber>;
    actualValue: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    unit: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    period?: string | undefined;
    phase?: string | undefined;
    kpiType?: "headcount" | "conversion_rate" | "timeline" | undefined;
    targetValue?: number | undefined;
    actualValue?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    period?: string | undefined;
    phase?: string | undefined;
    kpiType?: "headcount" | "conversion_rate" | "timeline" | undefined;
    targetValue?: number | undefined;
    actualValue?: number | undefined;
    unit?: string | undefined;
    notes?: string | undefined;
}>;
export type KpiType = z.infer<typeof KpiTypeSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpi = z.infer<typeof CreateKpiSchema>;
export type UpdateKpi = z.infer<typeof UpdateKpiSchema>;
//# sourceMappingURL=kpi.d.ts.map