import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import { Post } from '../../Models/Post';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim() === '') {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Case-insensitive search for posts where title contains the query
    const posts = await Post.find({
      title: { $regex: query, $options: 'i' }
    })
    .sort({ createdAt: -1 })
    .exec();

    // Transform the data to match the expected format
    const transformedPosts = posts.map((post: any) => ({
      _id: post._id,
      name: post.name || 'Unknown User',
      title: post.title,
      content: post.content,
      communitid: post.communitid,
      likes: post.likes || 0,
      comments: post.comments || [],
      media: post.media || [],
      createdAt: post.createdAt
    }));

    return NextResponse.json({ 
      success: true, 
      posts: transformedPosts,
      count: transformedPosts.length 
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
} 