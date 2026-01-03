import type { D1Database } from "@cloudflare/workers-types";
import type { Organization } from "@recruit-architect/openapi";
import { BaseService } from "./base.service";

export class OrganizationService extends BaseService<Organization> {
  constructor(db: D1Database) {
    super(db, "organization");
  }
}
