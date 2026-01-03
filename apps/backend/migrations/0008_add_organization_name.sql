-- Migration: Add name column to organizations table
-- Created: 2026-01-XX

-- Add name column to organizations table
ALTER TABLE organizations ADD COLUMN name TEXT;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations(name);

