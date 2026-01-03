-- Migration: Make FAQ answer field optional and category nullable
-- Created: 2026-01-04
-- This migration makes the answer and category columns nullable in faqs table

-- SQLite doesn't support ALTER COLUMN, so we need to recreate the table
-- First, create a new table with the updated schema
CREATE TABLE IF NOT EXISTS faqs_new (
  id TEXT PRIMARY KEY,
  category TEXT,
  category_id TEXT,
  question TEXT NOT NULL,
  answer TEXT,
  visibility TEXT NOT NULL CHECK (visibility IN ('internal', 'agt', 'public')),
  sort_order INTEGER,
  notes TEXT,
  comments TEXT,
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Copy data from old table to new table
INSERT INTO faqs_new 
SELECT 
  id,
  category,
  category_id,
  question,
  answer,
  visibility,
  sort_order,
  notes,
  comments,
  created_by,
  updated_by,
  created_at,
  updated_at
FROM faqs;

-- Drop old table
DROP TABLE faqs;

-- Rename new table to original name
ALTER TABLE faqs_new RENAME TO faqs;

