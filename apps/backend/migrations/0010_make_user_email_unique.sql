-- Migration: Make user email unique across all organizations
-- Created: 2026-01-XX

-- Drop existing unique constraint on (organization_id, email)
-- SQLite doesn't support DROP CONSTRAINT directly, so we need to recreate the table
CREATE TABLE IF NOT EXISTS users_new (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  notes TEXT,
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
);

-- Copy data from old table to new table
INSERT INTO users_new (id, organization_id, email, password_hash, name, notes, created_by, updated_by, created_at, updated_at)
SELECT id, organization_id, email, password_hash, name, notes, created_by, updated_by, created_at, updated_at
FROM users;

-- Drop old table
DROP TABLE users;

-- Rename new table to original name
ALTER TABLE users_new RENAME TO users;

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

