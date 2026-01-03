import { z } from 'zod';
export declare const JobPostingStatusSchema: z.ZodEnum<["draft", "under_review", "published", "closed"]>;
export declare const JobRevisionSchema: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodNumber;
    content: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    createdBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    id: string;
    content: string;
    version: number;
    createdBy?: string | undefined;
    reason?: string | undefined;
}, {
    createdAt: string;
    id: string;
    content: string;
    version: number;
    createdBy?: string | undefined;
    reason?: string | undefined;
}>;
export declare const JobPostingSchema: z.ZodObject<{
    id: z.ZodString;
    jobId: z.ZodString;
    positionName: z.ZodString;
    recruitmentBackground: z.ZodOptional<z.ZodString>;
    jobDescription: z.ZodOptional<z.ZodString>;
    requiredQualifications: z.ZodOptional<z.ZodString>;
    preferredQualifications: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodString>;
    workLocation: z.ZodOptional<z.ZodString>;
    employmentType: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["draft", "under_review", "published", "closed"]>;
    revisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        version: z.ZodNumber;
        content: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        createdBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }, {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }>, "many">>;
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
    status: "draft" | "under_review" | "published" | "closed";
    id: string;
    jobId: string;
    positionName: string;
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
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
    revisions?: {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    status: "draft" | "under_review" | "published" | "closed";
    id: string;
    jobId: string;
    positionName: string;
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
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
    revisions?: {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }[] | undefined;
}>;
export declare const CreateJobPostingSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    jobId: z.ZodString;
    positionName: z.ZodString;
    recruitmentBackground: z.ZodOptional<z.ZodString>;
    jobDescription: z.ZodOptional<z.ZodString>;
    requiredQualifications: z.ZodOptional<z.ZodString>;
    preferredQualifications: z.ZodOptional<z.ZodString>;
    salary: z.ZodOptional<z.ZodString>;
    workLocation: z.ZodOptional<z.ZodString>;
    employmentType: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<["draft", "under_review", "published", "closed"]>;
    revisions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        version: z.ZodNumber;
        content: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        createdBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }, {
        createdAt: string;
        id: string;
        content: string;
        version: number;
        createdBy?: string | undefined;
        reason?: string | undefined;
    }>, "many">>;
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
}, "createdAt" | "updatedAt" | "id" | "comments" | "revisions">, "strip", z.ZodTypeAny, {
    status: "draft" | "under_review" | "published" | "closed";
    jobId: string;
    positionName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
}, {
    status: "draft" | "under_review" | "published" | "closed";
    jobId: string;
    positionName: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
}>;
export declare const UpdateJobPostingSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["draft", "under_review", "published", "closed"]>>;
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    jobId: z.ZodOptional<z.ZodString>;
    positionName: z.ZodOptional<z.ZodString>;
    recruitmentBackground: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    jobDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    requiredQualifications: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preferredQualifications: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    salary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    workLocation: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    employmentType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "draft" | "under_review" | "published" | "closed" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    jobId?: string | undefined;
    positionName?: string | undefined;
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
}, {
    status?: "draft" | "under_review" | "published" | "closed" | undefined;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    notes?: string | undefined;
    jobId?: string | undefined;
    positionName?: string | undefined;
    recruitmentBackground?: string | undefined;
    jobDescription?: string | undefined;
    requiredQualifications?: string | undefined;
    preferredQualifications?: string | undefined;
    salary?: string | undefined;
    workLocation?: string | undefined;
    employmentType?: string | undefined;
}>;
export type JobPostingStatus = z.infer<typeof JobPostingStatusSchema>;
export type JobRevision = z.infer<typeof JobRevisionSchema>;
export type JobPosting = z.infer<typeof JobPostingSchema>;
export type CreateJobPosting = z.infer<typeof CreateJobPostingSchema>;
export type UpdateJobPosting = z.infer<typeof UpdateJobPostingSchema>;
//# sourceMappingURL=job-posting.d.ts.map