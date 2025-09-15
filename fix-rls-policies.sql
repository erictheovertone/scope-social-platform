-- Fix RLS policies that might be blocking user creation
-- Run this in Supabase SQL Editor if you see permission errors

-- Temporarily disable RLS to test
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own user data" ON users;
DROP POLICY IF EXISTS "Users can update own user data" ON users;
DROP POLICY IF EXISTS "Users can insert own user data" ON users;

-- Create simpler policies for testing
CREATE POLICY "Allow all operations on users for testing" ON users
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on profiles for testing" ON profiles
  FOR ALL USING (true) WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
