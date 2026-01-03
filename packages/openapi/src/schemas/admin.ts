import { z } from 'zod';
import { IdSchema, TimestampSchema, AuditSchema } from './common';

// Admin schema
export const AdminSchema = z.object({
  id: IdSchema,
  email: z.string().email(),
  name: z.string(),
  notes: z.string().nullish(),
}).merge(TimestampSchema).merge(AuditSchema);

// Admin with password hash (internal use only, not exposed in API)
export const AdminWithPasswordSchema = AdminSchema.extend({
  passwordHash: z.string(),
});

// Create admin schema (password will be hashed on backend)
export const CreateAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  notes: z.string().nullish(),
});

// Update admin schema
export const UpdateAdminSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  name: z.string().min(1).optional(),
  notes: z.string().nullish(),
});

// Type definitions
export type Admin = z.infer<typeof AdminSchema>;
export type AdminWithPassword = z.infer<typeof AdminWithPasswordSchema>;
export type CreateAdmin = z.infer<typeof CreateAdminSchema>;
export type UpdateAdmin = z.infer<typeof UpdateAdminSchema>;

