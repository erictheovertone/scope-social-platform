// Mock storage for testing posts without external services

import { mockBlockchain } from './mockBlockchain';

export interface MockPost {
  id: string;
  fileName: string;
  fileType: string;
  caption: string;
  gridLayout: string;
  dataUrl: string; // Base64 encoded file data for display
  createdAt: string;
  tokenId?: string; // Link to blockchain token
  creator: string;
}

// In-memory storage for testing
let mockPosts: MockPost[] = [];

export const mockStorage = {
  // Save post to memory with base64 data URL and auto-mint token
  async savePost(file: File, caption: string, gridLayout: string, creator: string = 'user123'): Promise<MockPost> {
    return new Promise(async (resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const post: MockPost = {
          id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          fileName: file.name,
          fileType: file.type,
          caption,
          gridLayout,
          dataUrl: reader.result as string,
          createdAt: new Date().toISOString(),
          creator
        };
        
        // Auto-mint token for this post (as per PRD)
        try {
          const token = await mockBlockchain.mintPostToken(post.id, creator);
          post.tokenId = token.tokenId;
        } catch (error) {
          console.error('Token minting failed:', error);
        }
        
        mockPosts.push(post);
        resolve(post);
      };
      reader.readAsDataURL(file);
    });
  },

  // Get all posts
  getPosts(): MockPost[] {
    return mockPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Clear all posts (for testing)
  clearPosts(): void {
    mockPosts = [];
  },

  // Get posts count
  getPostsCount(): number {
    return mockPosts.length;
  }
};
