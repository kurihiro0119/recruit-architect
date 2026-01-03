import type { D1Database } from "@cloudflare/workers-types";
import { createD1Service, type Env } from "../adapters/d1-db";

export type EntityType =
  | "kpi"
  | "initiative"
  | "companyAnalysis"
  | "jobPosting"
  | "jobRole"
  | "competitorJob"
  | "organization"
  | "selectionProcess"
  | "recruitmentChannel"
  | "faq";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export abstract class BaseService<T extends BaseEntity> {
  protected db: D1Database;
  protected entityType: EntityType;

  constructor(db: D1Database, entityType: EntityType) {
    this.db = db;
    this.entityType = entityType;
  }

  protected getRepository() {
    return createD1Service<T>(this.db, this.entityType);
  }

  async getAll(): Promise<T[]> {
    const repository = this.getRepository();
    return await repository.getAll();
  }

  async getById(id: string): Promise<T | null> {
    const repository = this.getRepository();
    return await repository.getById(id);
  }

  async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const repository = this.getRepository();
    return await repository.create(data);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const repository = this.getRepository();
    return await repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    const repository = this.getRepository();
    return await repository.delete(id);
  }
}
