-- Migration: Initial schema for Recruit Architect
-- Created: 2026-01-03

-- KPIs table
CREATE TABLE IF NOT EXISTS kpis (
  id TEXT PRIMARY KEY,
  period TEXT NOT NULL,
  phase TEXT,
  kpi_type TEXT NOT NULL CHECK (kpi_type IN ('headcount', 'conversion_rate', 'timeline')),
  target_value REAL NOT NULL,
  actual_value REAL,
  difference REAL,
  unit TEXT,
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Initiatives table
CREATE TABLE IF NOT EXISTS initiatives (
  id TEXT PRIMARY KEY,
  timing TEXT NOT NULL,
  schedule TEXT,
  milestone TEXT NOT NULL,
  main_owner TEXT NOT NULL,
  output_and_goal TEXT NOT NULL,
  status TEXT CHECK (status IN ('planned', 'in_progress', 'completed', 'on_hold')),
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Company analyses table
CREATE TABLE IF NOT EXISTS company_analyses (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  representative TEXT,
  founded_date TEXT,
  employees TEXT,
  address TEXT,
  competitors TEXT, -- JSON array
  company_position TEXT, -- JSON object
  competitor_strategies TEXT, -- JSON array
  industry_player_characteristics TEXT, -- JSON array
  external_internal_analysis TEXT, -- JSON object
  market_research TEXT, -- JSON object
  competitive_advantage TEXT, -- JSON object
  future_market_outlook TEXT, -- JSON object
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Job postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  position_name TEXT NOT NULL,
  recruitment_background TEXT,
  job_description TEXT,
  required_qualifications TEXT,
  preferred_qualifications TEXT,
  salary TEXT,
  work_location TEXT,
  employment_type TEXT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'under_review', 'published', 'closed')),
  revisions TEXT, -- JSON array
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Job roles table
CREATE TABLE IF NOT EXISTS job_roles (
  id TEXT PRIMARY KEY,
  job_type TEXT NOT NULL,
  grade TEXT NOT NULL,
  mission TEXT,
  specific_tasks TEXT,
  target_type TEXT CHECK (target_type IN ('internal', 'agt', 'both')),
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Competitor jobs table
CREATE TABLE IF NOT EXISTS competitor_jobs (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  job_url TEXT,
  highlight_points TEXT,
  salary TEXT,
  job_description TEXT,
  requirements TEXT,
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  department TEXT NOT NULL,
  role TEXT,
  headcount INTEGER,
  members TEXT, -- JSON array
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Selection processes table
CREATE TABLE IF NOT EXISTS selection_processes (
  id TEXT PRIMARY KEY,
  step_no INTEGER NOT NULL,
  phase_name TEXT NOT NULL,
  detailed_process TEXT,
  owner TEXT,
  required_days INTEGER,
  process_type TEXT NOT NULL CHECK (process_type IN ('current', 'ideal')),
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Recruitment channels table
CREATE TABLE IF NOT EXISTS recruitment_channels (
  id TEXT PRIMARY KEY,
  channel_name TEXT NOT NULL,
  characteristics TEXT,
  target_job_types TEXT, -- JSON array
  cost TEXT,
  effectiveness TEXT,
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  visibility TEXT NOT NULL CHECK (visibility IN ('internal', 'agt', 'public')),
  sort_order INTEGER,
  notes TEXT,
  comments TEXT, -- JSON array
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- History table
CREATE TABLE IF NOT EXISTS history (
  id TEXT PRIMARY KEY,
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  changes TEXT NOT NULL, -- JSON object
  user_id TEXT,
  user_name TEXT,
  timestamp TEXT NOT NULL
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_kpis_period ON kpis(period);
CREATE INDEX IF NOT EXISTS idx_initiatives_status ON initiatives(status);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_history_entity ON history(entity_id, entity_type);
CREATE INDEX IF NOT EXISTS idx_history_timestamp ON history(timestamp);
