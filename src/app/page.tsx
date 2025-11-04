"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, memo, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getAllPosts } from '@/lib/postsService';

// Lazy load BottomToolbar for better performance
const BottomToolbar = dynamic(() => import("@/components/BottomToolbar"), {
  loading: () => <div className="h-[60px]" />,
  ssr: false
});

import PostItem from "@/components/PostItem";

export default function Home() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authenticated) {
      router.push('/welcome');
    }
  }, [authenticated, router]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        if (allPosts.length === 0) {
          // Show mock posts if no real posts exist
          setPosts([
            { id: 'mock1', username: 'creator1', caption: 'Cinematic shot from my latest project', media_urls: [], created_at: new Date().toISOString() },
            { id: 'mock2', username: 'filmmaker2', caption: 'Ultra-wide landscape composition', media_urls: [], created_at: new Date().toISOString() },
            { id: 'mock3', username: 'visualartist', caption: 'Experimental grid layout design', media_urls: [], created_at: new Date().toISOString() }
          ]);
        } else {
          setPosts(allPosts);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Red dot logo - clickable link to home */}
      <Link href="/">
        <div className="absolute left-[10px] top-[10px] w-[15px] h-[15px] cursor-pointer">
          <div className="w-[15px] h-[15px] bg-[#FF0000] rounded-full"></div>
        </div>
      </Link>

      {/* Feed Content - Optimized posts */}
      <div className="absolute left-[15px] top-[50px] w-[345px] h-[680px] overflow-y-auto">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
          />
        ))}
      </div>

      
      <BottomToolbar />
    </div>
  );
}
