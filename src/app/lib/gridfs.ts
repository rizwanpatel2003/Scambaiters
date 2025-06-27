import { GridFSBucket, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import connectDB from './db';

export const uploadFile = async (file: Buffer, filename: string, contentType: string): Promise<string> => {
  const { bucket } = await connectDB();
  if (!bucket) throw new Error('GridFS bucket not initialized');

  const stream = Readable.from(file);
  const uploadStream = bucket.openUploadStream(filename, {
    contentType,
  });

  return new Promise((resolve, reject) => {
    stream.pipe(uploadStream)
      .on('error', reject)
      .on('finish', () => {
        resolve(uploadStream.id.toString());
      });
  });
};

export const getFile = async (fileId: string) => {
  const { bucket } = await connectDB();
  if (!bucket) throw new Error('GridFS bucket not initialized');

  const _id = new ObjectId(fileId);
  const files = await bucket.find({ _id }).toArray();
  if (files.length === 0) {
    throw new Error('File not found');
  }
  return bucket.openDownloadStream(_id);
};

export const deleteFile = async (fileId: string) => {
  const { bucket } = await connectDB();
  if (!bucket) throw new Error('GridFS bucket not initialized');

  const _id = new ObjectId(fileId);
  await bucket.delete(_id);
}; 