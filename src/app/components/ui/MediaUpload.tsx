'use client';

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { IconPhoto, IconVideo, IconX } from '@tabler/icons-react';

type MediaType = 'image' | 'video';

interface MediaUploadProps {
  onMediaUpload: (mediaFiles: Array<{ url: string; type: MediaType; publicId: string }>) => void;
}

export default function MediaUpload({ onMediaUpload }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<Array<{ url: string; type: MediaType }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const uploadedMedia: Array<{ url: string; type: MediaType; publicId: string }> = [];
    const newPreviews: Array<{ url: string; type: MediaType }> = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
          toast.error('Only images and videos are allowed');
          continue;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        const mediaType: MediaType = file.type.startsWith('image/') ? 'image' : 'video';
        
        // Get the file URL from your API response
        const fileUrl = `/api/media?id=${result.data.fileId}`;
        
        uploadedMedia.push({
          url: fileUrl,
          type: mediaType,
          publicId: result.data.fileId,
        });

        newPreviews.push({
          url: fileUrl,
          type: mediaType,
        });
      }

      setPreview(newPreviews);
      onMediaUpload(uploadedMedia);
      toast.success('Media uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload media');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeMedia = (index: number) => {
    const newPreviews = [...preview];
    newPreviews.splice(index, 1);
    setPreview(newPreviews);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            <IconPhoto size={20} />
            <IconVideo size={20} />
            <span>Add Media</span>
          </div>
        </label>
        {uploading && <span className="text-gray-500">Uploading...</span>}
      </div>

      {preview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {preview.map((media, index) => (
            <div key={index} className="relative group">
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-48 object-cover rounded-lg"
                  controls
                />
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IconX size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 