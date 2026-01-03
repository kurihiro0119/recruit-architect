-- Migration: Add FAQ categories table and update FAQs table
-- Created: 2026-01-04
-- This migration creates faq_categories table and updates faqs table to reference category

-- Create FAQ categories table
CREATE TABLE IF NOT EXISTS faq_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER,
  notes TEXT,
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Add category_id column to faqs table
ALTER TABLE faqs ADD COLUMN category_id TEXT;

-- Create a default category
INSERT INTO faq_categories (id, name, sort_order, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000001', 'その他', 999, datetime('now'), datetime('now'))
ON CONFLICT(id) DO NOTHING;

-- Set default category for existing FAQs
UPDATE faqs
SET category_id = '00000000-0000-0000-0000-000000000001'
WHERE category_id IS NULL;

