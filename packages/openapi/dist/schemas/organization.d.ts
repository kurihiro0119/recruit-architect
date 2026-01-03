import { z } from 'zod';
export declare const OrganizationMemberSchema: z.ZodObject<{
    id: z.ZodString;
    department: z.ZodString;
    team: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    employmentType: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    id: string;
    department: string;
    name: string;
    notes?: string | undefined;
    employmentType?: string | undefined;
    team?: string | undefined;
    role?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    department: string;
    name: string;
    notes?: string | undefined;
    employmentType?: string | undefined;
    team?: string | undefined;
    role?: string | undefined;
}>;
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    department: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    headcount: z.ZodOptional<z.ZodNumber>;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        department: z.ZodString;
        team: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        role: z.ZodOptional<z.ZodString>;
        employmentType: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    } & {
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
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
    id: string;
    department: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    department: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}>;
export declare const CreateOrganizationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    department: z.ZodString;
    role: z.ZodOptional<z.ZodString>;
    headcount: z.ZodOptional<z.ZodNumber>;
    members: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        department: z.ZodString;
        team: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        role: z.ZodOptional<z.ZodString>;
        employmentType: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    } & {
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
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
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    department: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}, {
    department: string;
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}>;
export declare const UpdateOrganizationSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    headcount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    department: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    members: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        department: z.ZodString;
        team: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        role: z.ZodOptional<z.ZodString>;
        employmentType: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    } & {
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }, {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    department?: string | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}, {
    createdBy?: string | undefined;
    updatedBy?: string | undefined;
    headcount?: number | undefined;
    notes?: string | undefined;
    department?: string | undefined;
    role?: string | undefined;
    members?: {
        createdAt: string;
        updatedAt: string;
        id: string;
        department: string;
        name: string;
        notes?: string | undefined;
        employmentType?: string | undefined;
        team?: string | undefined;
        role?: string | undefined;
    }[] | undefined;
}>;
export type OrganizationMember = z.infer<typeof OrganizationMemberSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
//# sourceMappingURL=organization.d.ts.map