import { z } from 'zod';
export declare const RecruitmentChannelSchema: z.ZodObject<{
    id: z.ZodString;
    channelName: z.ZodString;
    characteristics: z.ZodOptional<z.ZodString>;
    targetJobTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cost: z.ZodOptional<z.ZodString>;
    effectiveness: z.ZodOptional<z.ZodString>;
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
    channelName: string;
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
    characteristics?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    channelName: string;
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
    characteristics?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}>;
export declare const CreateRecruitmentChannelSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    channelName: z.ZodString;
    characteristics: z.ZodOptional<z.ZodString>;
    targetJobTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cost: z.ZodOptional<z.ZodString>;
    effectiveness: z.ZodOptional<z.ZodString>;
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
    channelName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    characteristics?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}, {
    channelName: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    characteristics?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}>;
export declare const UpdateRecruitmentChannelSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    characteristics: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    channelName: z.ZodOptional<z.ZodString>;
    targetJobTypes: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    cost: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    effectiveness: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    characteristics?: string | undefined;
    channelName?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | undefined;
    characteristics?: string | undefined;
    channelName?: string | undefined;
    targetJobTypes?: string[] | undefined;
    cost?: string | undefined;
    effectiveness?: string | undefined;
}>;
export type RecruitmentChannel = z.infer<typeof RecruitmentChannelSchema>;
export type CreateRecruitmentChannel = z.infer<typeof CreateRecruitmentChannelSchema>;
export type UpdateRecruitmentChannel = z.infer<typeof UpdateRecruitmentChannelSchema>;
//# sourceMappingURL=recruitment-channel.d.ts.map