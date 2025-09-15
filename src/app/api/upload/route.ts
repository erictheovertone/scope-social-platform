import { NextRequest, NextResponse } from 'next/server';
import { mockStorage } from '@/lib/mockStorage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string;
    const gridLayout = formData.get('gridLayout') as string || '1x-super-wide';
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Save to mock storage (no external services needed)
    const post = await mockStorage.savePost(file, caption, gridLayout);

    return NextResponse.json({ 
      success: true, 
      post,
      message: 'Post created successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
