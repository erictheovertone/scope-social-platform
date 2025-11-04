import { supabase } from './supabase/client';

interface Post {
  id: string;
  user_id: string;
  username: string;
  caption: string;
  media_urls: string[];
  layout_id: string;
  created_at: string;
  updated_at: string;
}

interface Like {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const createPost = async (postData: {
  userId: string;
  username: string;
  caption: string;
  mediaUrls: string[];
  layoutId: string;
}): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: postData.userId,
        username: postData.username,
        caption: postData.caption,
        media_urls: postData.mediaUrls,
        layout_id: postData.layoutId,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }

  return data || [];
};

export const getPostsByUsername = async (username: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('username', username)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by username:', error);
    return [];
  }

  return data || [];
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
};

// Likes functionality
export const likePost = async (postId: string, userId: string, username: string): Promise<Like> => {
  const { data, error } = await supabase
    .from('likes')
    .insert([
      {
        post_id: postId,
        user_id: userId,
        username: username,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error liking post:', error);
    throw error;
  }

  return data;
};

export const unlikePost = async (postId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

export const getPostLikes = async (postId: string): Promise<Like[]> => {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching post likes:', error);
    return [];
  }

  return data || [];
};

export const isPostLikedByUser = async (postId: string, userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking if post is liked:', error);
    return false;
  }

  return !!data;
};

// Comments functionality
export const addComment = async (
  postId: string,
  userId: string,
  username: string,
  content: string
): Promise<Comment> => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: postId,
        user_id: userId,
        username: username,
        content: content,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    throw error;
  }

  return data;
};

export const getPostComments = async (postId: string): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching post comments:', error);
    return [];
  }

  return data || [];
};

export const deleteComment = async (commentId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
