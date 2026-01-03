-- Migration: Add departments, teams, positions columns to organizations table
-- Created: 2026-01-03

-- Add new columns to organizations table if they don't exist
-- Note: SQLite doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN
-- So we need to check if the column exists first or handle errors

-- For development, you can run these manually if needed:
-- ALTER TABLE organizations ADD COLUMN departments TEXT;
-- ALTER TABLE organizations ADD COLUMN teams TEXT;
-- ALTER TABLE organizations ADD COLUMN positions TEXT;

-- Since SQLite doesn't support conditional ALTER TABLE,
-- this migration should be run manually or the database should be recreated

