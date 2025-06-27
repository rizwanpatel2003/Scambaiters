"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import MediaUpload from '../components/ui/MediaUpload';

interface MediaFile {
  url: string;
  type: 'image' | 'video';
  publicId: string;
}

interface Community {
  _id: string;
  name: string;
}

function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [communityName, setCommunityName] = useState('');
  const [communities, setCommunities] = useState<string[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValidCommunity, setIsValidCommunity] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch all communities on component mount
  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/communities/communitynames");
      // The API returns an array of community names directly
      if (Array.isArray(response.data.data)) {
        setCommunities(response.data.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        toast.error("Failed to load communities");
      }
    } catch (error) {
      console.log("Failed to fetch communities", error);
      toast.error("Failed to load communities");
    }
  };

  // Handle community name input changes
  const handleCommunityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommunityName(value);
    
    if (value.trim() === '') {
      setFilteredCommunities([]);
      setShowSuggestions(false);
      setIsValidCommunity(false);
      return;
    }

    // Filter communities based on input
    const filtered = communities.filter(communityName => 
      communityName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCommunities(filtered);
    setShowSuggestions(true);
    
    // Check if the exact community name exists
    const exactMatch = communities.some(communityName => 
      communityName.toLowerCase() === value.toLowerCase()
    );
    setIsValidCommunity(exactMatch);
  };

  // Handle community suggestion selection
  const handleCommunitySelect = (selectedName: string) => {
    setCommunityName(selectedName);
    setShowSuggestions(false);
    setIsValidCommunity(true);
    toast.success("Valid community selected!");
  };

  const handleMediaUpload = (files: MediaFile[]) => {
    setMediaFiles(files);
  };

  const validatePost = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!content.trim()) {
      toast.error('Content is required');
      return false;
    }
    if (!communityName.trim()) {
      toast.error('Community name is required');
      return false;
    }
    if (!isValidCommunity) {
      toast.error('Please select a valid community');
      return false;
    }
    if (title.length > 100) {
      toast.error('Title is too long (max 100 characters)');
      return false;
    }
    if (content.length > 5000) {
      toast.error('Content is too long (max 5000 characters)');
      return false;
    }
    return true;
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePost()) return;
    
    try {
      setLoading(true);
      
      // Get current user
      const currentUser = await axios.get('/api/user/currentuser');
      
      // Create FormData instance
      const formData = new FormData();
      
      // Append basic post data
      formData.append('name', communityName);
      formData.append('userid', currentUser.data.data._id);
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      
      // Append media files
      for (const file of mediaFiles) {
        try {
          // Fetch the file from the URL
          const response = await fetch(file.url);
          const blob = await response.blob();
          
          // Create a File object from the blob
          const fileObject = new File([blob], `file-${Date.now()}.${file.type === 'image' ? 'jpg' : 'mp4'}`, {
            type: file.type === 'image' ? 'image/jpeg' : 'video/mp4'
          });
          
          // Append the file to FormData
          
          formData.append('files', fileObject);
          console.log(formData);
        } catch (error) {
          console.error('Error processing file:', error);
          toast.error('Error processing one or more files');
        }
      }

      // Send the request with FormData
      const response = await axios.post('/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       console.log(response);
      if (response.status === 200) {
        toast.success('Post created successfully!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Post creation error:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to create a post');
        router.push('/Account/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create post');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmitPost} className="bg-neutral-900 rounded-[38px] p-6 shadow-lg shadow-white">
          <h1 className="text-3xl font-bold text-white mb-6">Create a Post</h1>
          
          {/* Community Name Input with Suggestions */}
          <div className="mb-6 relative">
            <input
              type="text"
              value={communityName}
              onChange={handleCommunityNameChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter community name"
              className={`w-full p-3 bg-neutral-800 text-white rounded-lg border ${
                communityName && (isValidCommunity ? 'border-green-500' : 'border-red-500')
              } focus:border-green-500 focus:ring-1 focus:ring-green-500`}
              disabled={loading}
            />
            {communityName && !isValidCommunity && (
              <p className="text-red-500 text-sm mt-1">Please select a valid community from the suggestions</p>
            )}
            {showSuggestions && filteredCommunities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredCommunities.map((name, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-neutral-700 cursor-pointer text-white"
                    onClick={() => handleCommunitySelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              maxLength={100}
              disabled={loading}
            />
            <p className="text-sm text-gray-400 mt-1">{title.length}/100 characters</p>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              className="w-full p-3 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 min-h-[200px]"
              maxLength={5000}
              disabled={loading}
            />
            <p className="text-sm text-gray-400 mt-1">{content.length}/5000 characters</p>
          </div>

          {/* Media Upload */}
          <div className="mb-6">
            <MediaUpload onMediaUpload={handleMediaUpload} />
            {mediaFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  {mediaFiles.length} {mediaFiles.length === 1 ? 'file' : 'files'} selected
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mediaFiles.map((file, index) => (
                    <div key={file.publicId} className="relative group">
                      {file.type === 'image' ? (
                        <img
                          src={file.url}
                          alt={`Uploaded media ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={file.url}
                          controls
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-full font-semibold text-white ${
                loading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              } transition-colors`}
            >
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;