import type { D1Database } from '@cloudflare/workers-types';
import type { User, UserWithPassword, CreateUser, UpdateUser } from '@recruit-architect/openapi';
import { hashPassword } from '../utils/password';

export class UserService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getAll(): Promise<User[]> {
    const result = await this.db
      .prepare('SELECT id, organization_id, email, name, notes, created_by, updated_by, created_at, updated_at FROM users ORDER BY created_at DESC')
      .all();
    return (result.results || []).map((row) => ({
      id: row.id as string,
      organizationId: row.organization_id as string,
      email: row.email as string,
      name: row.name as string,
      notes: row.notes as string | null | undefined,
      createdBy: row.created_by as string | null | undefined,
      updatedBy: row.updated_by as string | null | undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    })) as User[];
  }

  async getById(id: string): Promise<User | null> {
    const result = await this.db
      .prepare('SELECT id, organization_id, email, name, notes, created_by, updated_by, created_at, updated_at FROM users WHERE id = ?')
      .bind(id)
      .first();
    if (!result) return null;
    return {
      id: result.id as string,
      organizationId: result.organization_id as string,
      email: result.email as string,
      name: result.name as string,
      notes: result.notes as string | null | undefined,
      createdBy: result.created_by as string | null | undefined,
      updatedBy: result.updated_by as string | null | undefined,
      createdAt: result.created_at as string,
      updatedAt: result.updated_at as string,
    };
  }

  async getByOrganizationId(organizationId: string): Promise<User[]> {
    const result = await this.db
      .prepare('SELECT id, organization_id, email, name, notes, created_by, updated_by, created_at, updated_at FROM users WHERE organization_id = ? ORDER BY created_at DESC')
      .bind(organizationId)
      .all();
    return (result.results || []).map((row) => ({
      id: row.id as string,
      organizationId: row.organization_id as string,
      email: row.email as string,
      name: row.name as string,
      notes: row.notes as string | null | undefined,
      createdBy: row.created_by as string | null | undefined,
      updatedBy: row.updated_by as string | null | undefined,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    })) as User[];
  }

  async create(data: CreateUser): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const passwordHash = await hashPassword(data.password);

    await this.db
      .prepare(
        'INSERT INTO users (id, organization_id, email, password_hash, name, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(id, data.organizationId, data.email, passwordHash, data.name, data.notes || null, now, now)
      .run();

    const user = await this.getById(id);
    if (!user) {
      throw new Error('Failed to create user');
    }
    return user;
  }

  async update(id: string, data: UpdateUser): Promise<User | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.organizationId !== undefined) {
      updates.push('organization_id = ?');
      values.push(data.organizationId);
    }
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
      .prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();

    return await this.getById(id);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.getById(id);
    if (!existing) return false;

    await this.db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
    return true;
  }
}

