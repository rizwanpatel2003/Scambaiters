import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/db';
import { Post } from '../../Models/Post';

// For best performance, ensure a text index on the 'title' field in MongoDB:
// db.posts.createIndex({ title: "text" })

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    if (!query || query.trim() === '') {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Use projection to fetch only necessary fields
    const projection = {
      _id: 1,
      name: 1,
      title: 1,
      content: 1,
      communitid: 1,
      likes: 1,
      comments: 1,
      media: 1,
      createdAt: 1
    };

    // Use regex for case-insensitive search (consider $text for large datasets)
    const [posts, total] = await Promise.all([
      Post.find({ title: { $regex: query, $options: 'i' } }, projection)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments({ title: { $regex: query, $options: 'i' } })
    ]);

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search posts' },
      { status: 500 }
    );
  }
} 