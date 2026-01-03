import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env } from "./adapters/d1-db";
import { registerKpiRoutes } from "./routes/kpi.routes";
import { registerKpiSnapshotRoutes } from "./routes/kpi-snapshot.routes";
import { registerInitiativeRoutes } from "./routes/initiative.routes";
import { registerCompanyAnalysisRoutes } from "./routes/company-analysis.routes";
import { registerJobPostingRoutes } from "./routes/job-posting.routes";
import { registerJobRoleRoutes } from "./routes/job-role.routes";
import { registerCompetitorJobRoutes } from "./routes/competitor-job.routes";
import { registerOrganizationRoutes } from "./routes/organization.routes";
import { registerSelectionProcessRoutes } from "./routes/selection-process.routes";
import { registerRecruitmentChannelRoutes } from "./routes/recruitment-channel.routes";
import { registerFaqRoutes } from "./routes/faq.routes";
import { registerHistoryRoutes } from "./routes/history.routes";

const app = new Hono<{ Bindings: Env }>();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Root endpoint
app.get("/", (c) => {
  return c.json({
    name: "Recruit Architect API",
    version: "0.0.1",
    database: "Cloudflare D1",
    endpoints: [
      "/api/kpis",
      "/api/kpi-snapshots",
      "/api/initiatives",
      "/api/company-analyses",
      "/api/job-postings",
      "/api/job-roles",
      "/api/competitor-jobs",
      "/api/organizations",
      "/api/selection-processes",
      "/api/recruitment-channels",
      "/api/faqs",
      "/api/history",
    ],
  });
});

// Register all routes
registerKpiRoutes(app);
registerKpiSnapshotRoutes(app);
registerInitiativeRoutes(app);
registerCompanyAnalysisRoutes(app);
registerJobPostingRoutes(app);
registerJobRoleRoutes(app);
registerCompetitorJobRoutes(app);
registerOrganizationRoutes(app);
registerSelectionProcessRoutes(app);
registerRecruitmentChannelRoutes(app);
registerFaqRoutes(app);
registerHistoryRoutes(app);

export default app;
