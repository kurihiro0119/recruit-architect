import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema } from './common';

// User schema (organization user)
export const UserSchema = z.object({
  id: IdSchema,
  organizationId: z.string(),
  email: z.string().email(),
  name: z.string(),
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// User with password hash (internal use only, not exposed in API)
export const UserWithPasswordSchema = UserSchema.extend({
  passwordHash: z.string(),
});

// Create user schema (password will be hashed on backend)
export const CreateUserSchema = z.object({
  organizationId: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  notes: z.string().nullish(),
});

// Update user schema
export const UpdateUserSchema = z.object({
  organizationId: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  name: z.string().min(1).optional(),
  notes: z.string().nullish(),
});

// Type definitions
export type User = z.infer<typeof UserSchema>;
export type UserWithPassword = z.infer<typeof UserWithPasswordSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

