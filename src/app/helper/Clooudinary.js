import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream'
// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// const uploadOnCloudinary = async (buffer) => {
//   try {
//     if (!buffer) return null;

  
//     const uploadResponse = await cloudinary.uploader.upload_stream({
//       resource_type: "auto"
//     }, (error, result) => {
//       if (error) {
//         console.error("Upload error:", error);
//         return null;
//       }
//       console.log("File has been uploaded successfully");
//       console.log("File is uploaded on Cloudinary", result.url);
//       return result;
//     });

   
//     // Convert the buffer to a readable stream and pipe it to the upload stream
//     const stream = Readable.from(buffer);
//     stream.pipe(uploadResponse);

//     // Return a promise that resolves when the upload is complete
//     return new Promise((resolve, reject) => {
//       uploadResponse.on('finish', () => resolve(uploadResponse));
//       uploadResponse.on('error', (err) => reject(err));
//     });

//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }


const uploadOnCloudinary = async (buffer) => {
  try {
    if (!buffer) return null;

    // Create a promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      const uploadResponse = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto"
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            return reject(error);
          }
          console.log("File has been uploaded successfully");
          console.log("File is uploaded on Cloudinary", result.url);
          resolve(result); // Resolve with the result which contains the URL
        }
      );

    
      const stream = Readable.from(buffer);
      stream.pipe(uploadResponse);
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { uploadOnCloudinary };