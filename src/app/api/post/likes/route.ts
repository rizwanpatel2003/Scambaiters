import connectDB from "../../../lib/db";
import { Post } from "../../../Models/Post";
import { User } from "../../../Models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const reqBody = await request.json();
        const { userId, postId } = reqBody;
        
        if (!userId || !mongoose.Types.ObjectId.isValid(userId) ||
            !postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({
                message: "Valid userId and postId are required",
                status: 400
            });
        }

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return NextResponse.json({
                message: "Post not found",
                status: 404
            });
        }

        // Check if user has already liked the post
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 404
            });
        }

        const hasLiked = user.postLiked?.some((field: any) => String(field) === String(postId)) || false;
        let updatedPost;

        if (hasLiked) {
            // Unlike: Remove post from user's liked posts and decrement count, but never go below zero
            await User.findByIdAndUpdate(
                userId,
                { $pull: { postLiked: postId } }
            );

            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $set: { likes: Math.max(0, (post.likes || 0) - 1) } },
                { new: true, projection: { likes: 1 } }
            ).lean();
        } else {
            // Like: Add post to user's liked posts and increment count
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { postLiked: postId } }
            );

            updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 } },
                { new: true, projection: { likes: 1 } }
            ).lean();
        }

        return NextResponse.json({
            message: hasLiked ? "Post unliked successfully" : "Post liked successfully",
            likes: updatedPost?.likes ?? 0,
            status: 200
        });
    } catch (error) {
        console.error("Like update failed:", error);
        return NextResponse.json({
            message: "Like update failed",
            error: error,
            status: 500
        });
    }
}