import { IconMessageCircle, IconShare, IconShield } from "@tabler/icons-react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface MediaItem {
  fileId: string;
  filename: string;
  contentType: string;
}

interface data {
    postId: string;    
    name: string;
    title: string;
    content: string;
    communityId?: string|undefined;
    Tlike: number;
    comments?: number;
    media?: MediaItem[];
}

function PostCard({postId, name, title, content, communityId, Tlike, comments, media}: data) {
    const router = useRouter();
    const [likeCount, setLikeCount] = useState(Tlike || 0);
    const [hasLiked, setHasLiked] = useState(false);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    
    // On mount, check if user has liked this post
    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const currentUser = await axios.get("/api/user/currentuser");
                if (currentUser.data.data?._id) {
                    const user = await axios.get(`/api/user/${currentUser.data.data._id}`);
                    if (user.data.data?.postLiked) {
                        setHasLiked(user.data.data.postLiked.some((id: string) => id === postId));
                    }
                }
            } catch (error) {
                // handle error if needed
            }
        };
        checkLikeStatus();
    }, [postId]);
    
    const handleLike = async () => {
        try {
            const currentUser = await axios.get("/api/user/currentuser");
            if (!currentUser.data.data?._id) {
                toast.error("Please login to like posts");
                router.push("/Account/login");
                return;
            }

            if (!hasLiked) {
                setLikeCount((prev) => prev + 1);
                setHasLiked(true);
            } else {
                setLikeCount((prev) => Math.max(0, prev - 1));
                setHasLiked(false);
            }

            // Call API in background, don't update UI from response
            axios.post("/api/post/likes", {
                userId: currentUser.data.data._id,
                postId,
            }).catch((error) => {
                // Optionally, revert UI if you want, or just log error
                console.error("Failed to update like in database:", error);
            });
        } catch (error) {
            // handle error
        }
    };

    // Generate random color between 100 and 200 for each RGB component
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 101) + 150;
        const g = Math.floor(Math.random() * 101) + 150;
        const b = Math.floor(Math.random() * 101) + 150;
        return `rgb(${r}, ${g}, ${b})`;
    };
    
    const [cardColor] = useState(generateRandomColor());

    const followUpdate = async function () {
        try {
            const currentUser = await axios.get("/api/user/currentuser");
            const response = await axios.post("/api/user/join", {
                id: currentUser.data.data._id,
                userid: communityId
            });
            toast.success("Successfully joined the community!");
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Please login to join communities");
                router.push("/Account/login");
            } else {
                toast.error("Failed to join community");
            }
        }
    };

    const isImage = (contentType: string) => contentType.startsWith('image/');
    const isVideo = (contentType: string) => contentType.startsWith('video/');

    return (
        <div 
            className="my-10 rounded-[38px] w-11/12 shadow-lg p-4 transition-transform transform hover:-translate-y-1"
            style={{ backgroundColor: cardColor }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/50" alt="Profile Picture" className="rounded-full w-10 h-10" />
                    <div className="ml-3">
                        <h3 
                            className="text-xl text-black font-semibold font-Roboto Flex cursor-pointer hover:underline"
                            onClick={() => { router.push(`/community/${communityId}`) }}
                        >
                            {name}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center">
                    <button 
                        className="text-white bg-black hover:bg-gray-800 mr-2 w-20 h-[40px] rounded-[38px] text-lg font-Roboto Flex font-bold transition-colors" 
                        onClick={followUpdate}
                    >
                        Join
                    </button>
                </div>
            </div>
            
            <h2 className="text-black text-2xl font-Roboto Flex font-bold mb-4">
                {title}
            </h2>
            
            <p 
                className="text-black text-lg font-semibold font-Roboto Flex mb-4 cursor-pointer hover:opacity-90"
                onClick={() => { router.push(`/comments/${postId}`) }}
            >
                {content}
            </p>

            {media && media.length > 0 && (
                <div className="mb-4">
                    <div className="relative rounded-lg overflow-hidden bg-black/5">
                        {isImage(media[activeMediaIndex].contentType) ? (
                            <img
                                src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                                alt={media[activeMediaIndex].filename}
                                className="w-full max-h-[500px] object-contain"
                            />
                        ) : isVideo(media[activeMediaIndex].contentType) ? (
                            <video
                                src={`/api/media?id=${media[activeMediaIndex].fileId}`}
                                className="w-full max-h-[500px] object-contain"
                                controls
                            />
                        ) : null}
                        
                        {media.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {media.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveMediaIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            index === activeMediaIndex ? 'bg-white' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            <div className="flex items-center justify-between px-[5vh] mt-4">
                <button 
                    className={`flex items-center gap-2 transition-colors ${hasLiked ? 'text-green-600' : 'text-black'} hover:opacity-80`}
                    onClick={handleLike}
                >
                    <IconShield className={hasLiked ? 'fill-current' : ''} />
                    <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                </button>
                
                <button 
                    className="flex items-center gap-2 text-black hover:opacity-80"
                    onClick={() => { router.push(`/comments/${postId}`) }}
                >
                    <IconMessageCircle />
                    <span>{comments || 0} {(comments || 0) === 1 ? 'Comment' : 'Comments'}</span>
                </button>
                
                <button className="flex items-center gap-2 text-black hover:opacity-80">
                    <IconShare />
                    Share
                </button>
            </div>
        </div>
    );
}

export default PostCard;