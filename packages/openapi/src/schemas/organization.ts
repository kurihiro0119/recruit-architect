import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema } from './common';

// 部署スキーマ（正規化後）
export const DepartmentSchema = z.object({
  id: IdSchema,
  organizationId: z.string(), // 組織ID
  name: z.string(),
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// チームスキーマ（正規化後）
export const TeamSchema = z.object({
  id: IdSchema,
  departmentId: z.string(), // 親部署のID
  name: z.string(),
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// 役職スキーマ（正規化後）
export const PositionSchema = z.object({
  id: IdSchema,
  organizationId: z.string(), // 組織ID
  name: z.string(),
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// 組織メンバースキーマ（正規化後）
export const OrganizationMemberSchema = z.object({
  id: IdSchema,
  organizationId: z.string(), // 組織ID
  departmentId: z.string(), // 部署ID
  teamId: z.string().nullish(), // チームID（オプショナル）
  positionId: z.string().nullish(), // 役職ID（オプショナル）
  name: z.string(),
  employmentType: z.string().nullish(), // 雇用形態（例: "正社員"）
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// 組織スキーマ（正規化後 - リレーションは別テーブルで管理）
export const OrganizationSchema = z.object({
  id: IdSchema,
  name: z.string(),
  status: z.enum(['active', 'inactive']).default('active'),
}).merge(TimestampSchema);

// 作成用スキーマ
export const CreateDepartmentSchema = DepartmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();

export const CreateTeamSchema = TeamSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateTeamSchema = CreateTeamSchema.partial();

export const CreatePositionSchema = PositionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdatePositionSchema = CreatePositionSchema.partial();

export const CreateOrganizationMemberSchema = OrganizationMemberSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateOrganizationMemberSchema = CreateOrganizationMemberSchema.partial();

export const CreateOrganizationSchema = OrganizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

// 型定義
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
