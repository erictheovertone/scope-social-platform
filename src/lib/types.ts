export type GridLayout = 
  | '2-across-16:9'
  | '2-across-2.4:1'
  | '1-across-16:9'
  | '1-across-2.4:1'
  | '3-across-4:3'
  | 'collage';

export interface Post {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  aspectRatio: '16:9' | '2.4:1' | '4:3' | '1:1';
  createdAt: string;
  tokenId?: string;
  supply?: number;
  price?: number;
  marketCap?: number;
  creatorId: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export interface Profile {
  id: string;
  username: string;
  bio: string;
  profileImageUrl: string;
  gridLayout: GridLayout;
  posts: Post[];
  collectedPosts: Post[];
  createdAt: string;
}

export interface TokenInfo {
  tokenId: string;
  supply: number;
  price: number;
  marketCap: number;
  holders: number;
}
