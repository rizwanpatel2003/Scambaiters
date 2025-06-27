import { NextRequest } from 'next/server';
import { Post } from '../../../Models/Post';
import connectDB from '../../../lib/db';

export async function GET(request: NextRequest) {
    const postId = request.nextUrl.searchParams.get('postId');
    
    if (!postId) {
        return new Response('Post ID is required', { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Set up SSE headers
    const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    };

    let intervalId: NodeJS.Timeout;

    try {
        await connectDB();

        // Function to send post updates
        const sendUpdate = async () => {
            try {
                const post: any = await Post.findById(postId)
                    .select('likes comments')
                    .lean();

                if (!post) {
                    throw new Error('Post not found');
                }

                const data = {
                    likes: post.likes || 0,
                    comments: post.comments?.length || 0,
                };

                const eventData = `data: ${JSON.stringify(data)}\n\n`;
                await writer.write(encoder.encode(eventData));
            } catch (error) {
                console.error('Error sending update:', error);
                clearInterval(intervalId);
                writer.close();
            }
        };

        // Send initial data
        await sendUpdate();

        // Set up interval for updates
        intervalId = setInterval(sendUpdate, 1000);

        // Handle client disconnect
        request.signal.addEventListener('abort', () => {
            clearInterval(intervalId);
            writer.close();
        });

        return new Response(stream.readable, { headers });
    } catch (error) {
        console.error('SSE setup error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 