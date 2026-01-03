-- Migration: Update selection process owner fields
-- Created: 2026-01-04
-- This migration adds ownerType, ownerId, and ownerDisplayName fields to selection_processes table

-- Add new owner-related columns
-- Note: SQLite doesn't support CHECK constraints in ALTER TABLE, so we add the column without constraint
-- The constraint will be enforced at the application level via Zod schema
ALTER TABLE selection_processes ADD COLUMN owner_type TEXT;
ALTER TABLE selection_processes ADD COLUMN owner_id TEXT;
ALTER TABLE selection_processes ADD COLUMN owner_display_name TEXT;

-- Migrate existing owner data to ownerDisplayName if owner exists
UPDATE selection_processes 
SET owner_display_name = owner, owner_type = 'text'
WHERE owner IS NOT NULL AND owner != '';

