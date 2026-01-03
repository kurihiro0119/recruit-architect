import type { Hono } from "hono";
import type { Organization } from "@recruit-architect/openapi";
import {
  CreateOrganizationSchema,
  UpdateOrganizationSchema,
} from "@recruit-architect/openapi";
import type { Env } from "../adapters/d1-db";
import { OrganizationService } from "../services/organization.service";
import { createCrudRoutes } from "./base.routes";

export function registerOrganizationRoutes(app: Hono<{ Bindings: Env }>) {
  createCrudRoutes<Organization>(
    app,
    "/api/organizations",
    (db) => new OrganizationService(db),
    CreateOrganizationSchema,
    UpdateOrganizationSchema,
    "Organization"
  );
}
