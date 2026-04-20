"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { createPost } from '@/lib/postsService';
import { getUserByPrivyId, getProfile, uploadImage } from '@/lib/userService';

// ── Client-side image compression via Canvas API ──────────────────
// Max 1920px longest side, JPEG 0.82 quality, all formats → JPEG.
// Falls back to the original file on any error so uploads never break.
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const MAX = 1920;
    const QUALITY = 0.82;
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width >= height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return; }
          const base = file.name.replace(/\.[^.]+$/, "");
          resolve(new File([blob], `${base}-compressed.jpg`, { type: "image/jpeg" }));
        },
        "image/jpeg",
        QUALITY
      );
    };

    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file); };
    img.src = objectUrl;
  });
}

const VIDEO_MAX_BYTES = 50 * 1024 * 1024; // 50 MB

interface MediaItem {
  id: string;
  file: File;
  url: string;
  type: 'image' | 'video';
}

interface GridLayout {
  id: string;
  name: string;
  aspectRatio: string;
  gridTemplate: string;
  preview: string;
}

const GRID_LAYOUTS: GridLayout[] = [
  { id: 'single', name: 'Single', aspectRatio: '1:1', gridTemplate: 'grid-cols-1 grid-rows-1', preview: '□' },
  { id: 'horizontal', name: 'Horizontal', aspectRatio: '21:9', gridTemplate: 'grid-cols-1 grid-rows-1', preview: '▬' },
  { id: 'vertical', name: 'Vertical', aspectRatio: '9:16', gridTemplate: 'grid-cols-1 grid-rows-1', preview: '▮' },
  { id: 'grid2x2', name: '2x2 Grid', aspectRatio: '1:1', gridTemplate: 'grid-cols-2 grid-rows-2', preview: '⊞' },
  { id: 'grid3x1', name: '3x1 Strip', aspectRatio: '3:1', gridTemplate: 'grid-cols-3 grid-rows-1', preview: '⊟' }
];

const PROFILE_TO_POST_LAYOUT: { [key: string]: string } = {
  '2x-super-wide': 'horizontal',
  '1x-super-wide': 'horizontal',
  '2x-regular-wide': 'horizontal',
  '3x-square': 'single',
  'collage': 'grid2x2'
};

interface CreatePostFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userLayoutId?: string;
}

export default function CreatePostFlow({ isOpen, onClose, userLayoutId = '3x-square' }: CreatePostFlowProps) {
  const [step, setStep] = useState<'media' | 'edit' | 'posting'>('media');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<GridLayout>(GRID_LAYOUTS[0]);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isOptimising, setIsOptimising] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = usePrivy();

  useEffect(() => {
    const mappedId = PROFILE_TO_POST_LAYOUT[userLayoutId] || 'single';
    const layout = GRID_LAYOUTS.find(l => l.id === mappedId) || GRID_LAYOUTS[0];
    setSelectedLayout(layout);
  }, [userLayoutId, isOpen]);

  const handleMediaSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    // Reset input so the same file can be re-selected later
    event.target.value = "";

    setIsOptimising(true);
    setVideoError(null);

    const newMedia: MediaItem[] = [];

    for (const file of Array.from(files)) {
      if (file.type.startsWith("video/")) {
        if (file.size > VIDEO_MAX_BYTES) {
          setVideoError("Video must be under 50MB. Please trim or compress before uploading.");
          continue;
        }
        newMedia.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
          type: "video",
        });
      } else if (file.type.startsWith("image/")) {
        let processedFile = file;
        try {
          processedFile = await compressImage(file);
        } catch (e) {
          console.error("Image compression failed, using original:", e);
        }
        newMedia.push({
          id: `${Date.now()}-${Math.random()}`,
          file: processedFile,
          url: URL.createObjectURL(processedFile),
          type: "image",
        });
      }
    }

    setSelectedMedia(prev => [...prev, ...newMedia]);
    setIsOptimising(false);
  }, []);

  const handleRemoveMedia = useCallback((id: string) => {
    setSelectedMedia(prev => {
      const removed = prev.find(item => item.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter(item => item.id !== id);
    });
  }, []);

  const handlePost = async () => {
    if (!user || selectedMedia.length === 0) return;

    setIsUploading(true);
    setPostError(null);

    try {
      const supabaseUser = await getUserByPrivyId(user.id);
      if (!supabaseUser) throw new Error('User not found in database');
      const profile = await getProfile(supabaseUser.id);
      if (!profile?.username) throw new Error('Profile or username not found');

      const mediaUrls: string[] = [];
      for (const media of selectedMedia) {
        const url = await uploadImage(media.file, 'post-media', user.id);
        mediaUrls.push(url);
      }

      await createPost({
        userId: user.id,
        username: profile.username,
        caption,
        mediaUrls,
        layoutId: selectedLayout.id,
      });

      selectedMedia.forEach(item => URL.revokeObjectURL(item.url));
      setIsUploading(false);
      onClose();
      setStep('media');
      setSelectedMedia([]);
      setCaption('');
      router.push('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
      setPostError('Failed to create post. Please try again.');
      setIsUploading(false);
    }
  };

  const renderMediaStep = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <button onClick={onClose} className="text-white text-lg">×</button>
        <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px]">New Post</h2>
        <button
          onClick={() => setStep('edit')}
          disabled={selectedMedia.length === 0}
          className={`font-['IBM_Plex_Mono'] font-medium text-[14px] ${selectedMedia.length > 0 ? 'text-[#FF0000] cursor-pointer' : 'text-[#666666]'}`}
        >
          Next
        </button>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Optimising indicator */}
        {isOptimising && (
          <p className="font-['IBM_Plex_Mono'] text-[#888888] text-[11px] mb-3 text-center">
            Optimising…
          </p>
        )}

        {/* Video error */}
        {videoError && (
          <p className="font-['IBM_Plex_Mono'] text-[#FF0000] text-[11px] mb-3">
            {videoError}
          </p>
        )}

        {selectedMedia.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-2 border-dashed border-[#333333] rounded-lg flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="#666666"/>
              </svg>
            </div>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[#666666] text-[14px] mb-2 text-center">
              Select photos and videos from your library
            </p>
            <p className="font-['IBM_Plex_Mono'] text-[#444444] text-[10px] mb-6 text-center">
              Videos up to 50MB · MP4 recommended
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#FF0000] text-white px-6 py-3 rounded-full font-['IBM_Plex_Mono'] font-medium text-[14px] hover:bg-[#CC0000] transition-colors"
            >
              Choose from Library
            </button>
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleMediaSelect} className="hidden" />
          </div>
        ) : (
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-2 mb-4">
              {selectedMedia.map((item) => (
                <div key={item.id} className="relative aspect-square bg-[#333333] rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" />
                  )}
                  <button
                    onClick={() => handleRemoveMedia(item.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square bg-[#333333] rounded-lg border-2 border-dashed border-[#666666] flex items-center justify-center"
              >
                <span className="text-[#666666] text-2xl">+</span>
              </button>
            </div>
            <p className="font-['IBM_Plex_Mono'] text-[#444444] text-[10px] text-center">
              Videos up to 50MB · MP4 recommended
            </p>
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleMediaSelect} className="hidden" />
          </div>
        )}
      </div>
    </div>
  );

  const renderEditStep = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <button onClick={() => setStep('media')} className="text-white text-lg">←</button>
        <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px]">Edit & Post</h2>
        <button
          onClick={handlePost}
          disabled={isUploading}
          className={`font-['IBM_Plex_Mono'] font-medium text-[14px] ${isUploading ? 'text-[#666666]' : 'text-[#FF0000] cursor-pointer'}`}
        >
          {isUploading ? 'Posting...' : 'Share'}
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4">
          <div className="w-full h-64 bg-[#1A1A1A] border border-[#333333] rounded-lg overflow-hidden mb-4">
            {selectedMedia[0] && (
              <img src={selectedMedia[0].url} alt="Preview" className="w-full h-full object-contain" />
            )}
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full bg-transparent text-white font-['IBM_Plex_Mono'] text-[14px] resize-none border-none outline-none placeholder-[#666666]"
            rows={4}
          />
        </div>

        <div className="border-t border-[#333333] p-4">
          <p className="font-['IBM_Plex_Mono'] font-medium text-[#666666] text-[12px] mb-1">
            Layout: {selectedLayout.name} ({selectedLayout.aspectRatio})
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[10px]">
            {selectedMedia.length} media item{selectedMedia.length !== 1 ? 's' : ''} selected
          </p>
          {postError && (
            <p className="font-['IBM_Plex_Mono'] font-medium text-[#FF0000] text-[11px] mt-2">
              {postError}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex items-center justify-center">
      <div className="bg-black border border-[#333333] w-[375px] h-[600px] relative overflow-hidden">
        {step === 'media' && renderMediaStep()}
        {step === 'edit' && renderEditStep()}
      </div>
    </div>
  );
}
