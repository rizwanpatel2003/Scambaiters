"use client"

import JoinCard from '../../components/ui/JoinCard';
import PostCard from '../../components/ui/PostCard';
import Sidebar from '../../components/ui/Sidebar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation"
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Page() {
  interface Comment {
    comment: string;
    userId: string;
    createdAt?: string;
  }

  interface BiryaniPost {
    _id: string;
    name: string;
    communitid: string;
    title: string;
    content: string;
    __v: number;
    likes: number;
    updatedAt: string;
    comments: Comment[];
  }
  
  const projectId = useParams().id;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [comment, setComment] = useState<string>("");
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<BiryaniPost>({
    _id: "",
    name: "",
    communitid: "",
    title: "",
    content: "",
    __v: 0,
    likes: 0,
    updatedAt: "",
    comments: []
  });

  const Comment = async function() {
    if (!comment.trim()) {
      toast.error("Please write a comment first");
      return;
    }
    setIsLoading(true);
    const commentText = comment.trim();
    try {
      const currentUser = await axios.get("/api/user/currentuser");
      if (!currentUser.data.data?._id) {
        toast.error("Please login to comment");
        router.push("/Account/login");
        return;
      }
      // Create new comment object for immediate UI update
      const newComment = {
        comment: commentText,
        userId: currentUser.data.data._id,
        createdAt: new Date().toISOString()
      };
      setPostComments(prev => [...prev, newComment]);
      setComment(""); // Clear input immediately for better UX

      // Save to database in background
      await axios.post("/api/post/comments", {
        userId: currentUser.data.data._id,
        postId: post._id,
        comment: commentText
      });
    } catch (error: any) {
      // Revert UI if database update fails
      setPostComments(prev => prev.slice(0, -1));
      setComment(commentText); // Restore the comment text
      if (error?.response?.status === 401) {
        toast.error("Please login to comment");
        router.push("/Account/login");
      } else {
        toast.error("Failed to post comment. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial post fetch to get existing comments
  useEffect(() => {
    const loadPost = async () => {
      setIsPageLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/post/singlepost", {
          postId: projectId
        });
        
        if (response.data.data) {
          setPost(response.data.data);
          setPostComments(response.data.data.comments || []);
        } else {
          toast.error("Post not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading post:", error);
        toast.error("Failed to load post");
      } finally {
        setIsPageLoading(false);
      }
    };

    loadPost();
  }, [projectId]);

  // No polling needed - Twitter style immediate updates

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      Comment();
    }
  };

  if (isPageLoading) {
    return (
      <div className='flex w-full'>
        <Sidebar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full'>
      <div className='w-1/4'>
        <Sidebar></Sidebar>
        </div>
      <div className="w-3/4 flex-1 flex flex-col items-center justify-center">
      
        <div className="w-full flex justify-center items-center">
          <PostCard 
            postId={post._id} 
            name={post.name} 
            title={post.title} 
            content={post.content} 
            communityId={post.communitid} 
            Tlike={post.likes} 
            comments={postComments.length}
          />            
        </div>
        <div className='w-3/4 flex items-center justify-center'>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-3/4 p-2 h-16 bg-neutral-950 shadow-sm shadow-white text-white border-none 
                     transition-all duration-300 ease-in-out
                     hover:-translate-y-1 hover:shadow-md hover:shadow-white 
                     mt-10 rounded-full mb-10 
                     focus:h-[100px] focus:rounded-lg resize-none"
            placeholder="Write comment... (Press Enter to submit)"
            disabled={isLoading}
          />
          <button 
            className={`bg-green-300 w-24 p-[1vh] rounded-3xl h-[60px] ml-2 
                      transition-all duration-300 
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-400'}`}
            onClick={Comment}
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
        <div className="w-3/4 flex flex-col justify-center items-center">
          <h1 className='text-2xl font-Roboto opacity-50 text-white self-start ml-14'>
            Comments ({postComments.length})
          </h1>
          {postComments.length === 0 ? (
            <p className="text-gray-500 mt-4">No comments yet. Be the first to comment!</p>
          ) : (
            <div className="w-full space-y-4 mt-4">
              {postComments.map((item: Comment, index: number) => (
                <JoinCard key={`${item.userId}-${index}`} head={item.userId} main={item.comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}