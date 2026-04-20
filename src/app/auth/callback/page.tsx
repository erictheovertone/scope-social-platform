"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { syncUserWithSupabase, getUserByPrivyId, getProfile } from "@/lib/userService";

export default function AuthCallback() {
  const router = useRouter();
  const { user, authenticated, ready } = usePrivy();

  useEffect(() => {
    if (!ready) return;

    if (!authenticated || !user) {
      router.replace("/welcome");
      return;
    }

    const checkProfile = async () => {
      try {
        // Ensure the user row exists in Supabase
        await syncUserWithSupabase(user);

        const supabaseUser = await getUserByPrivyId(user.id);
        if (!supabaseUser) {
          router.replace("/profile/setup");
          return;
        }

        const profile = await getProfile(supabaseUser.id);
        if (profile && profile.username) {
          router.replace("/profile");
        } else {
          router.replace("/profile/setup");
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/profile/setup");
      }
    };

    checkProfile();
  }, [ready, authenticated, user, router]);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          backgroundColor: "#FF0000",
          borderRadius: "50%",
          animation: "swift-bounce 0.4s infinite",
          transform: "translateY(-15px)",
        }}
      />
    </div>
  );
}
