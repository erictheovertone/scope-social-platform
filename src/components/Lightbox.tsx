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

interface LightboxProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ post, isOpen, onClose }: LightboxProps) {
  const { user } = usePrivy();
  const [likes, setLikes] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && post) {
      loadPostData();
    }
  }, [isOpen, post, user?.id]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full w-full flex bg-black rounded-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image/Video */}
        <div className="flex-1 flex items-center justify-center bg-black">
          {post.media_urls && post.media_urls[0] && (
            <img
              src={post.media_urls[0]}
              alt="Post"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Sidebar with details */}
        <div className="w-80 bg-[#1A1A1A] border-l border-[#333333] flex flex-col">
          {/* User info */}
          <div className="p-4 border-b border-[#333333]">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#333333] rounded-full mr-3"></div>
              <div>
                <button className="font-['IBM_Plex_Mono'] font-medium text-white text-[14px] hover:underline">
                  @{post.username}
                </button>
                <p className="font-['IBM_Plex_Mono'] font-normal text-[#888888] text-[11px]">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            {post.caption && (
              <p className="font-['IBM_Plex_Mono'] font-normal text-white text-[13px] mt-3">
                {post.caption}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-b border-[#333333]">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                disabled={loading || !user}
                className={`flex items-center space-x-2 ${
                  isLiked ? 'text-[#FF0000]' : 'text-[#888888]'
                } hover:text-white transition-colors`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span className="font-['IBM_Plex_Mono'] text-[13px]">{likes.length}</span>
              </button>

              <div className="flex items-center space-x-2 text-[#888888]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="font-['IBM_Plex_Mono'] text-[13px]">{comments.length}</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#555555] rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-['IBM_Plex_Mono'] font-medium text-white text-[12px]">
                        @{comment.username}
                      </span>
                      <span className="font-['IBM_Plex_Mono'] text-[#888888] text-[10px]">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-['IBM_Plex_Mono'] text-white text-[12px] mt-1">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add comment */}
          {user && (
            <div className="p-4 border-t border-[#333333]">
              <div className="flex items-center space-x-2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
