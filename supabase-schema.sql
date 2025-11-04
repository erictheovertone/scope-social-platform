-- Enable RLS (Row Level Security)
ALTER TABLE IF EXISTS posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS comments ENABLE ROW LEVEL SECURITY;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS posts;

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  caption TEXT,
  media_urls TEXT[] NOT NULL,
  layout_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table  
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX posts_user_id_idx ON posts(user_id);
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX likes_post_id_idx ON likes(post_id);
CREATE INDEX likes_user_id_idx ON likes(user_id);
CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_created_at_idx ON comments(created_at DESC);

-- RLS Policies
-- Posts policies
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own posts" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own posts" ON posts FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own posts" ON posts FOR DELETE USING (true);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can insert their own likes" ON likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete their own likes" ON likes FOR DELETE USING (true);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can insert their own comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own comments" ON comments FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own comments" ON comments FOR DELETE USING (true);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
ALTER PUBLICATION supabase_realtime ADD TABLE comments;
