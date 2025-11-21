-- PanelVerse Database Indexes
-- Optimize query performance

-- User Books Indexes
CREATE INDEX IF NOT EXISTS idx_user_books_user ON user_books(user_id);
CREATE INDEX IF NOT EXISTS idx_user_books_book ON user_books(book_id);
CREATE INDEX IF NOT EXISTS idx_user_books_status ON user_books(status);
CREATE INDEX IF NOT EXISTS idx_user_books_added_at ON user_books(added_at DESC);

-- Comments Indexes
CREATE INDEX IF NOT EXISTS idx_comments_book ON comments(book_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Book Stats Indexes (for trending/popular queries)
CREATE INDEX IF NOT EXISTS idx_book_stats_read_count ON book_stats(read_count DESC);
CREATE INDEX IF NOT EXISTS idx_book_stats_rating ON book_stats(rating_avg DESC);
CREATE INDEX IF NOT EXISTS idx_book_stats_rating_count ON book_stats(rating_count DESC);

-- Tags Indexes (for popular tags)
CREATE INDEX IF NOT EXISTS idx_tags_use_count ON tags(use_count DESC);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- Books Indexes
CREATE INDEX IF NOT EXISTS idx_books_external ON books(external_source, external_id);
CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn);
CREATE INDEX IF NOT EXISTS idx_books_is_gn ON books(is_graphic_novel);

-- Categories Index
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Follows Indexes
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
