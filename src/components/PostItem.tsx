"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { 
  likePost, 
  unlikePost, 
  getPostLikes, 
  isPostLikedByUser,
  addComment,
  getPostComments
} from "@/lib/postsService";

interface Post {
  id: string;
  user_id: string;
  username: string;
  caption: string;
  media_urls: string[];
  layout_id: string;
  created_at: string;
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
}

export default function PostItem({ post }: { post: Post }) {
  const { user } = usePrivy();
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPostData();
  }, [post.id, user]);

  const loadPostData = async () => {
    try {
      const [likesData, commentsData, likedByUser] = await Promise.all([
        getPostLikes(post.id),
        getPostComments(post.id),
        user ? isPostLikedByUser(post.id, user.id) : Promise.resolve(false)
      ]);
      
      setLikes(likesData);
      setComments(commentsData);
      setIsLiked(likedByUser);
    } catch (error) {
      console.error('Error loading post data:', error);
    }
  };

  const handleLike = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      if (isLiked) {
        await unlikePost(post.id, user.id);
        setLikes(prev => prev.filter(like => like.user_id !== user.id));
        setIsLiked(false);
      } else {
        const newLike = await likePost(post.id, user.id, user.email ? String(user.email).split('@')[0] : 'user');
        setLikes(prev => [...prev, newLike]);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;
    
    setLoading(true);
    try {
      const comment = await addComment(
        post.id, 
        user.id, 
        user.email ? String(user.email).split('@')[0] : 'user', 
        newComment.trim()
      );
      setComments(prev => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-[30px] bg-[#1A1A1A] border border-[#333333] rounded-lg p-[15px]">
      {/* User info */}
      <div className="flex items-center mb-[10px]">
        <div className="w-[30px] h-[30px] bg-[#333333] rounded-full mr-[10px]"></div>
        <div>
          <p className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px]">
            @{post.username}
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[10px]">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="font-['IBM_Plex_Mono'] font-normal text-white text-[13px] mb-[10px]">
          {post.caption}
        </p>
      )}

      {/* Media */}
      {post.media_urls && post.media_urls[0] && (
        <div className="w-full mb-[10px] bg-[#333333] rounded overflow-hidden">
          <img
            src={post.media_urls[0]}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mb-[10px]">
        <div className="flex items-center space-x-4">
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={loading || !user}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-[#FF0000]' : 'text-[#888888]'
            } hover:text-white transition-colors`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="font-['IBM_Plex_Mono'] text-[11px]">{likes.length}</span>
          </button>

          {/* Comment button */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-[#888888] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="font-['IBM_Plex_Mono'] text-[11px]">{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="border-t border-[#333333] pt-[10px]">
          {/* Add comment */}
          {user && (
            <div className="flex items-center space-x-2 mb-[10px]">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-[#333333] border border-[#555555] rounded px-3 py-2 text-white text-[12px] font-['IBM_Plex_Mono'] focus:border-[#FF0000] focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                disabled={loading || !newComment.trim()}
                className="bg-[#FF0000] text-white px-3 py-2 rounded text-[11px] font-['IBM_Plex_Mono'] hover:bg-[#CC0000] transition-colors disabled:opacity-50"
              >
                Post
              </button>
            </div>
          )}

          {/* Comments list */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <div className="w-[20px] h-[20px] bg-[#555555] rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[11px]">
                      @{comment.username}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[#888888] text-[9px]">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-['IBM_Plex_Mono'] text-white text-[11px] mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
