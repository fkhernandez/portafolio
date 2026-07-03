CREATE TABLE IF NOT EXISTS project_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business TEXT,
  website TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  monthly_support TEXT NOT NULL,
  project_details TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referer TEXT
);

CREATE INDEX IF NOT EXISTS idx_project_inquiries_created_at
  ON project_inquiries (created_at DESC);
