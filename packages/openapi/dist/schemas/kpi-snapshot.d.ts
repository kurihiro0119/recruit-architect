import { z } from 'zod';
export declare const KpiSnapshotSchema: z.ZodObject<{
    id: z.ZodString;
    kpiId: z.ZodString;
    snapshotDate: z.ZodString;
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
    comments: z.ZodOptional<z.ZodString>;
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
    kpiId: string;
    snapshotDate: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    kpiId: string;
    snapshotDate: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
}>;
export declare const CreateKpiSnapshotSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    kpiId: z.ZodString;
    snapshotDate: z.ZodString;
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
    comments: z.ZodOptional<z.ZodString>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodString>;
    updatedBy: z.ZodOptional<z.ZodString>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    kpiId: string;
    snapshotDate: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
}, {
    kpiId: string;
    snapshotDate: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
}>;
export declare const UpdateKpiSnapshotSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
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
    comments: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    kpiId: z.ZodOptional<z.ZodString>;
    snapshotDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
    kpiId?: string | undefined;
    snapshotDate?: string | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    phaseData?: {
        phaseName: string;
        targetValue?: number | undefined;
        actualValue?: number | undefined;
    }[] | undefined;
    comments?: string | undefined;
    kpiId?: string | undefined;
    snapshotDate?: string | undefined;
}>;
export type KpiSnapshot = z.infer<typeof KpiSnapshotSchema>;
export type CreateKpiSnapshot = z.infer<typeof CreateKpiSnapshotSchema>;
export type UpdateKpiSnapshot = z.infer<typeof UpdateKpiSnapshotSchema>;
//# sourceMappingURL=kpi-snapshot.d.ts.map