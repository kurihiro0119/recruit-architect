import { z } from 'zod';
export declare const DepartmentSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const TeamSchema: z.ZodObject<{
    id: z.ZodString;
    departmentId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const PositionSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const OrganizationMemberSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    departmentId: z.ZodString;
    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    positionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    employmentType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    organizationId: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    employmentType?: string | null | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    organizationId: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    employmentType?: string | null | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}>;
export declare const OrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
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
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | null | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    comments?: {
        createdAt: string;
        id: string;
        content: string;
        authorId?: string | undefined;
        authorName?: string | undefined;
    }[] | null | undefined;
}>;
export declare const CreateDepartmentSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const UpdateDepartmentSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    name: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    organizationId?: string | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    organizationId?: string | undefined;
}>;
export declare const CreateTeamSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    departmentId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    name: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    name: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const UpdateTeamSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    name: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    departmentId?: string | undefined;
}>;
export declare const CreatePositionSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    name: string;
    organizationId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const UpdatePositionSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    name: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    organizationId?: string | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    organizationId?: string | undefined;
}>;
export declare const CreateOrganizationMemberSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    organizationId: z.ZodString;
    departmentId: z.ZodString;
    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    positionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    employmentType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id">, "strip", z.ZodTypeAny, {
    name: string;
    organizationId: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    employmentType?: string | null | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}, {
    name: string;
    organizationId: string;
    departmentId: string;
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    employmentType?: string | null | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}>;
export declare const UpdateOrganizationMemberSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    name: z.ZodOptional<z.ZodString>;
    employmentType: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    organizationId: z.ZodOptional<z.ZodString>;
    departmentId: z.ZodOptional<z.ZodString>;
    teamId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    positionId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    employmentType?: string | null | undefined;
    organizationId?: string | undefined;
    departmentId?: string | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
    name?: string | undefined;
    employmentType?: string | null | undefined;
    organizationId?: string | undefined;
    departmentId?: string | undefined;
    teamId?: string | null | undefined;
    positionId?: string | null | undefined;
}>;
export declare const CreateOrganizationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
} & {
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "createdAt" | "updatedAt" | "id" | "comments">, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export declare const UpdateOrganizationSchema: z.ZodObject<{
    createdBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    updatedBy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, "strip", z.ZodTypeAny, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}, {
    createdBy?: string | null | undefined;
    updatedBy?: string | null | undefined;
    notes?: string | null | undefined;
}>;
export type Department = z.infer<typeof DepartmentSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Position = z.infer<typeof PositionSchema>;
export type OrganizationMember = z.infer<typeof OrganizationMemberSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateDepartment = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartment = z.infer<typeof UpdateDepartmentSchema>;
export type CreateTeam = z.infer<typeof CreateTeamSchema>;
export type UpdateTeam = z.infer<typeof UpdateTeamSchema>;
export type CreatePosition = z.infer<typeof CreatePositionSchema>;
export type UpdatePosition = z.infer<typeof UpdatePositionSchema>;
export type CreateOrganizationMember = z.infer<typeof CreateOrganizationMemberSchema>;
export type UpdateOrganizationMember = z.infer<typeof UpdateOrganizationMemberSchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganization = z.infer<typeof UpdateOrganizationSchema>;
//# sourceMappingURL=organization.d.ts.map