"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/postsService";
import PostItem from "@/components/PostItem";
import PostModal from "@/components/PostModal";

export default function Home() {
  const { authenticated } = usePrivy();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [lightboxPost, setLightboxPost] = useState<any>(null);

  useEffect(() => {
    if (!authenticated) router.push("/welcome");
  }, [authenticated, router]);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await getAllPosts();
        if (all.length === 0) {
          setPosts([
            { id: "mock1", username: "creator1",    caption: "Cinematic shot from my latest project", media_urls: [], created_at: new Date().toISOString() },
            { id: "mock2", username: "filmmaker2",   caption: "Ultra-wide landscape composition",      media_urls: [], created_at: new Date().toISOString() },
            { id: "mock3", username: "visualartist", caption: "Experimental grid layout design",       media_urls: [], created_at: new Date().toISOString() },
          ]);
        } else {
          setPosts(all);
        }
      } catch (e) {
        console.error("Error loading posts:", e);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-black relative w-[375px] min-h-screen mx-auto">

      {/* Red dot */}
      <Link href="/">
        <div className="absolute left-[4px] top-[4px] w-[11px] h-[11px] cursor-pointer">
          <div className="w-[11px] h-[11px] bg-[#FF0000] rounded-full" />
        </div>
      </Link>

      {/* SCREENING ROOM label — top-right, matches Figma */}
      <div className="absolute right-[4px] top-[4px]">
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "white", letterSpacing: "-0.2px" }}>
          SCREENING ROOM
        </span>
      </div>

      {/* Feed */}
      <div className="absolute left-[18px] right-[18px] top-[30px] bottom-[60px] overflow-y-auto">
        <div style={{ paddingBottom: 80 }}>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onImageClick={() => setLightboxPost(post)}
            />
          ))}
        </div>
      </div>

      {lightboxPost && (
        <PostModal
          post={lightboxPost}
          onClose={() => setLightboxPost(null)}
        />
      )}

    </div>
  );
}
