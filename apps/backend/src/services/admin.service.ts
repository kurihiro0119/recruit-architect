import type { D1Database } from '@cloudflare/workers-types';
import type { Admin, AdminWithPassword, CreateAdmin, UpdateAdmin } from '@recruit-architect/openapi';
import { hashPassword } from '../utils/password';

export class AdminService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getAll(): Promise<Admin[]> {
    const result = await this.db
      .prepare('SELECT id, email, name, notes, created_by, updated_by, created_at, updated_at FROM admins ORDER BY created_at DESC')
      .all();
    return (result.results || []) as Admin[];
  }

  async getById(id: string): Promise<Admin | null> {
    const result = await this.db
      .prepare('SELECT id, email, name, notes, created_by, updated_by, created_at, updated_at FROM admins WHERE id = ?')
      .bind(id)
      .first();
    return (result as Admin) || null;
  }

  async getByEmail(email: string): Promise<AdminWithPassword | null> {
    const result = await this.db
      .prepare('SELECT id, email, password_hash, name, notes, created_by, updated_by, created_at, updated_at FROM admins WHERE email = ?')
      .bind(email)
      .first();
    if (!result) return null;
    return {
      id: result.id as string,
      email: result.email as string,
      passwordHash: result.password_hash as string,
      name: result.name as string,
      notes: result.notes as string | null | undefined,
      createdBy: result.created_by as string | null | undefined,
      updatedBy: result.updated_by as string | null | undefined,
      createdAt: result.created_at as string,
      updatedAt: result.updated_at as string,
    };
  }

  async create(data: CreateAdmin): Promise<Admin> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const passwordHash = await hashPassword(data.password);

    await this.db
      .prepare(
        'INSERT INTO admins (id, email, password_hash, name, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(id, data.email, passwordHash, data.name, data.notes || null, now, now)
      .run();

    const admin = await this.getById(id);
    if (!admin) {
      throw new Error('Failed to create admin');
    }
    return admin;
  }

  async update(id: string, data: UpdateAdmin): Promise<Admin | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.email !== undefined) {
      updates.push('email = ?');
      values.push(data.email);
    }
    if (data.password !== undefined) {
      const passwordHash = await hashPassword(data.password);
      updates.push('password_hash = ?');
      values.push(passwordHash);
    }
    if (data.name !== undefined) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.notes !== undefined) {
      updates.push('notes = ?');
      values.push(data.notes);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push('updated_at = ?');
    values.push(now);
    values.push(id);

    await this.db
      .prepare(`UPDATE admins SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) return false;

    await this.db.prepare('DELETE FROM admins WHERE id = ?').bind(id).run();
    return true;
  }
}

