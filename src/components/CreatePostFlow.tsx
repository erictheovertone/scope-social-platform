"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { createPost } from '@/lib/postsService';
import { getUserGridLayout, getDefaultGridLayout } from '@/lib/gridLayoutService';

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
  {
    id: 'single',
    name: 'Single',
    aspectRatio: '1:1',
    gridTemplate: 'grid-cols-1 grid-rows-1',
    preview: '□'
  },
  {
    id: 'horizontal',
    name: 'Horizontal',
    aspectRatio: '21:9',
    gridTemplate: 'grid-cols-1 grid-rows-1',
    preview: '▬'
  },
  {
    id: 'vertical',
    name: 'Vertical',
    aspectRatio: '9:16',
    gridTemplate: 'grid-cols-1 grid-rows-1',
    preview: '▮'
  },
  {
    id: 'grid2x2',
    name: '2x2 Grid',
    aspectRatio: '1:1',
    gridTemplate: 'grid-cols-2 grid-rows-2',
    preview: '⊞'
  },
  {
    id: 'grid3x1',
    name: '3x1 Strip',
    aspectRatio: '3:1',
    gridTemplate: 'grid-cols-3 grid-rows-1',
    preview: '⊟'
  }
];

interface CreatePostFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostFlow({ isOpen, onClose }: CreatePostFlowProps) {
  const [step, setStep] = useState<'media' | 'caption'>('media');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<GridLayout>(GRID_LAYOUTS[0]);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user } = usePrivy();

  // Load user's preferred grid layout on mount
  useEffect(() => {
    if (user?.id) {
      const userLayout = getUserGridLayout(user.id);
      if (userLayout) {
        // Map grid layout service IDs to CreatePostFlow layout IDs
        const layoutMapping: { [key: string]: string } = {
          '2x-super-wide': 'horizontal',
          '1x-super-wide': 'horizontal',
          '2x-regular-wide': 'horizontal',
          '3x-square': 'single',
          'collage': 'grid2x2'
        };
        
        const mappedLayoutId = layoutMapping[userLayout.layoutId] || 'single';
        const layout = GRID_LAYOUTS.find(l => l.id === mappedLayoutId) || GRID_LAYOUTS[0];
        setSelectedLayout(layout);
      }
    }
  }, [user?.id, isOpen]);

  const handleMediaSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newMedia: MediaItem[] = [];
    Array.from(files).forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      
      newMedia.push({
        id: `${Date.now()}-${index}`,
        file,
        url,
        type
      });
    });

    setSelectedMedia(prev => [...prev, ...newMedia]);
  }, []);

  const handleRemoveMedia = useCallback((id: string) => {
    setSelectedMedia(prev => {
      const updated = prev.filter(item => item.id !== id);
      // Clean up object URLs
      const removed = prev.find(item => item.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      return updated;
    });
  }, []);

  const handlePost = async () => {
    if (!user || selectedMedia.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Convert media files to data URLs for storage
      const mediaUrls: string[] = [];
      for (const media of selectedMedia) {
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(media.file);
        });
        mediaUrls.push(dataUrl);
      }
      
      // Create the post
      await createPost({
        userId: user.id,
        username: 'overtone', // You can get this from user profile later
        caption,
        mediaUrls,
        layoutId: selectedLayout.id,
      });
      
      // Clean up object URLs
      selectedMedia.forEach(item => URL.revokeObjectURL(item.url));
      
      setIsUploading(false);
      onClose();
      
      // Reset state
      setStep('media');
      setSelectedMedia([]);
      setCaption('');
      // Keep the user's preferred layout for next time
      
      // Navigate to profile to see the new post
      router.push('/profile');
    } catch (error) {
      console.error('Error creating post:', error);
      setIsUploading(false);
    }
  };

  const renderMediaStep = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <button onClick={onClose} className="text-white text-lg">×</button>
        <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px]">New Post</h2>
        <button 
          onClick={() => setStep('caption')}
          disabled={selectedMedia.length === 0}
          className={`font-['IBM_Plex_Mono'] font-medium text-[14px] ${
            selectedMedia.length > 0 ? 'text-[#FF0000] cursor-pointer' : 'text-[#666666]'
          }`}
        >
          Next
        </button>
      </div>

      <div className="flex-1 p-4">
        {selectedMedia.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-24 h-24 border-2 border-dashed border-[#333333] rounded-lg flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="#666666"/>
              </svg>
            </div>
            <p className="font-['IBM_Plex_Mono'] font-medium text-[#666666] text-[14px] mb-6 text-center">
              Select photos and videos from your library
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#FF0000] text-white px-6 py-3 rounded-full font-['IBM_Plex_Mono'] font-medium text-[14px] hover:bg-[#CC0000] transition-colors"
            >
              Choose from Library
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div>
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
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );



  const renderCaptionStep = () => (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#333333]">
        <button onClick={() => setStep('media')} className="text-white text-lg">←</button>
        <h2 className="font-['IBM_Plex_Mono'] font-medium text-white text-[16px]">New Post</h2>
        <button 
          onClick={handlePost}
          disabled={isUploading}
          className={`font-['IBM_Plex_Mono'] font-medium text-[14px] ${
            isUploading ? 'text-[#666666]' : 'text-[#FF0000] cursor-pointer'
          }`}
        >
          {isUploading ? 'Posting...' : 'Share'}
        </button>
      </div>

      <div className="flex-1 p-4">
        <div className="flex mb-4">
          <div className="w-16 h-16 bg-[#333333] rounded-lg mr-3 overflow-hidden flex-shrink-0">
            {selectedMedia[0] && (
              selectedMedia[0].type === 'image' ? (
                <img src={selectedMedia[0].url} alt="" className="w-full h-full object-cover" />
              ) : (
                <video src={selectedMedia[0].url} className="w-full h-full object-cover" />
              )
            )}
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="flex-1 bg-transparent text-white font-['IBM_Plex_Mono'] text-[14px] resize-none border-none outline-none placeholder-[#666666]"
            rows={4}
          />
        </div>

        <div className="border-t border-[#333333] pt-4">
          <p className="font-['IBM_Plex_Mono'] font-medium text-[#666666] text-[12px] mb-2">
            Layout: {selectedLayout.name} ({selectedLayout.aspectRatio})
          </p>
          <p className="font-['IBM_Plex_Mono'] font-normal text-[#666666] text-[10px]">
            {selectedMedia.length} media item{selectedMedia.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex items-center justify-center">
      <div className="bg-black border border-[#333333] w-[375px] h-[600px] relative overflow-hidden">
        {step === 'media' && renderMediaStep()}
        {step === 'caption' && renderCaptionStep()}
      </div>
    </div>
  );
}
