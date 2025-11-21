-- PanelVerse Database Schema
-- SQLite (Cloudflare D1 compatible)
-- Version: 1.0.0

-- ============================================
-- TABLE: users
-- Purpose: Store user account information
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  provider TEXT NOT NULL, -- 'google' | 'twitter'
  provider_id TEXT NOT NULL,
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: books
-- Purpose: Store book metadata (deduplicated)
-- ============================================
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT,
  cover_url TEXT,
  description TEXT,
  publisher TEXT,
  publish_date TEXT,
  page_count INTEGER,
  language TEXT DEFAULT 'en',
  is_graphic_novel BOOLEAN DEFAULT 1, -- 1=yes, 0=no
  external_id TEXT, -- Google Books ID or other
  external_source TEXT, -- 'google_books' | 'open_library'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(external_source, external_id)
);

-- ============================================
-- TABLE: user_books
-- Purpose: User's reading records and ratings
-- ============================================
CREATE TABLE IF NOT EXISTS user_books (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  status TEXT DEFAULT 'read', -- 'read' | 'want_to_read' | 'reading'
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  review TEXT,
  notes TEXT, -- Private notes
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  UNIQUE(user_id, book_id)
);

-- ============================================
-- TABLE: categories
-- Purpose: Book categories (Detective, Romance, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_by TEXT, -- NULL = system default
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- TABLE: tags
-- Purpose: User-generated tags
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_by TEXT,
  use_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- TABLE: book_categories
-- Purpose: Many-to-many relationship between books and categories
-- ============================================
CREATE TABLE IF NOT EXISTS book_categories (
  book_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  PRIMARY KEY (book_id, category_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: book_tags
-- Purpose: Many-to-many relationship between books and tags
-- ============================================
CREATE TABLE IF NOT EXISTS book_tags (
  book_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (book_id, tag_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: comments
-- Purpose: User comments on books (supports replies)
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  book_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  parent_id TEXT, -- For nested replies
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: likes
-- Purpose: Likes on comments
-- ============================================
CREATE TABLE IF NOT EXISTS likes (
  user_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, comment_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: follows
-- Purpose: User following relationships
-- ============================================
CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE: book_stats
-- Purpose: Cached statistics for query optimization
-- ============================================
CREATE TABLE IF NOT EXISTS book_stats (
  book_id TEXT PRIMARY KEY,
  read_count INTEGER DEFAULT 0,
  want_to_read_count INTEGER DEFAULT 0,
  rating_avg REAL DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
