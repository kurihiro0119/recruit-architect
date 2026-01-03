import { z } from 'zod';
export declare const ProcessTypeSchema: z.ZodEnum<["current", "ideal"]>;
export declare const SelectionProcessSchema: z.ZodObject<{
    id: z.ZodString;
    stepNo: z.ZodNumber;
    phaseName: z.ZodString;
    detailedProcess: z.ZodOptional<z.ZodString>;
    owner: z.ZodOptional<z.ZodString>;
    requiredDays: z.ZodOptional<z.ZodNumber>;
    processType: z.ZodEnum<["current", "ideal"]>;
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
    stepNo: number;
    phaseName: string;
    processType: "current" | "ideal";
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
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    stepNo: number;
    phaseName: string;
    processType: "current" | "ideal";
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
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
}>;
export declare const CreateSelectionProcessSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    stepNo: z.ZodNumber;
    phaseName: z.ZodString;
    detailedProcess: z.ZodOptional<z.ZodString>;
    owner: z.ZodOptional<z.ZodString>;
    requiredDays: z.ZodOptional<z.ZodNumber>;
    processType: z.ZodEnum<["current", "ideal"]>;
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
    stepNo: number;
    phaseName: string;
    processType: "current" | "ideal";
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
}, {
    stepNo: number;
    phaseName: string;
    processType: "current" | "ideal";
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
}>;
export declare const UpdateSelectionProcessSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    stepNo: z.ZodOptional<z.ZodNumber>;
    phaseName: z.ZodOptional<z.ZodString>;
    detailedProcess: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    owner: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    requiredDays: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    processType: z.ZodOptional<z.ZodEnum<["current", "ideal"]>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    stepNo?: number | undefined;
    phaseName?: string | undefined;
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
    processType?: "current" | "ideal" | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    stepNo?: number | undefined;
    phaseName?: string | undefined;
    detailedProcess?: string | undefined;
    owner?: string | undefined;
    requiredDays?: number | undefined;
    processType?: "current" | "ideal" | undefined;
}>;
export type ProcessType = z.infer<typeof ProcessTypeSchema>;
export type SelectionProcess = z.infer<typeof SelectionProcessSchema>;
export type CreateSelectionProcess = z.infer<typeof CreateSelectionProcessSchema>;
export type UpdateSelectionProcess = z.infer<typeof UpdateSelectionProcessSchema>;
//# sourceMappingURL=selection-process.d.ts.map