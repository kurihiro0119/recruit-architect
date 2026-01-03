-- Migration: Clean up organizations table - keep only id, name, status, created_at, updated_at
-- Created: 2026-01-XX

-- Note: SQLite doesn't support DROP COLUMN directly, so we need to recreate the table
-- First, create a new table with only the columns we want
CREATE TABLE IF NOT EXISTS organizations_new (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Copy data from old table to new table
INSERT INTO organizations_new (id, name, status, created_at, updated_at)
SELECT 
  id,
  COALESCE(name, '') as name,
  COALESCE(status, 'active') as status,
  created_at,
  updated_at
FROM organizations;

-- Drop old table
DROP TABLE organizations;

-- Rename new table to original name
ALTER TABLE organizations_new RENAME TO organizations;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations(name);

