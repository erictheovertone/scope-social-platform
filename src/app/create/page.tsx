"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreatePostFlow from "@/components/CreatePostFlow";
import BottomToolbar from "@/components/BottomToolbar";

export default function CreatePage() {
  const [showCreateFlow, setShowCreateFlow] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setShowCreateFlow(false);
    router.push('/');
  };

  return (
    <div className="bg-black relative w-[375px] h-[812px] mx-auto">
      {/* Create Post Flow */}
      <CreatePostFlow 
        isOpen={showCreateFlow} 
        onClose={handleClose} 
      />
      
      <BottomToolbar />
    </div>
  );
}
