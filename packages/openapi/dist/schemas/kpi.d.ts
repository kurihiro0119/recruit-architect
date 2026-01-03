import { z } from 'zod';
export declare const PhaseDataSchema: z.ZodObject<{
    phaseName: z.ZodString;
    targetValue: z.ZodOptional<z.ZodNumber>;
    actualValue: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    phaseName: string;
    targetValue?: number | undefined;
    actualValue?: number | undefined;
}, {
    phaseName: string;
    targetValue?: number | undefined;
    actualValue?: number | undefined;
}>;
export declare const KpiSchema: z.ZodObject<{
    id: z.ZodString;
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    phase: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    phaseData: z.ZodOptional<z.ZodArray<z.ZodObject<{
        phaseName: z.ZodString;
        targetValue: z.ZodOptional<z.ZodNumber>;
        actualValue: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }>, "many">>;
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
    periodStart: string;
    periodEnd: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
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
    periodStart: string;
    periodEnd: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
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
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    phase: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    phaseData: z.ZodOptional<z.ZodArray<z.ZodObject<{
        phaseName: z.ZodString;
        targetValue: z.ZodOptional<z.ZodNumber>;
        actualValue: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }>, "many">>;
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
    periodStart: string;
    periodEnd: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
}, {
    periodStart: string;
    periodEnd: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
}>;
export declare const UpdateKpiSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    periodStart: z.ZodOptional<z.ZodString>;
    periodEnd: z.ZodOptional<z.ZodString>;
    phase: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phaseData: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        phaseName: z.ZodString;
        targetValue: z.ZodOptional<z.ZodNumber>;
        actualValue: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }, {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    periodStart?: string | undefined;
    periodEnd?: string | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    periodStart?: string | undefined;
    periodEnd?: string | undefined;
    phase?: string | undefined;
    notes?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
}>;
export type PhaseData = z.infer<typeof PhaseDataSchema>;
export type Kpi = z.infer<typeof KpiSchema>;
export type CreateKpi = z.infer<typeof CreateKpiSchema>;
export type UpdateKpi = z.infer<typeof UpdateKpiSchema>;
//# sourceMappingURL=kpi.d.ts.map