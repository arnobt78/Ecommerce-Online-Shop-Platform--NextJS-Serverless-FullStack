import { put, del } from '@vercel/blob';

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  
  const blob = await put(newName, image, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  
  if (!blob.url) throw new Error('Image upload failed');
  return blob.url;
};

export const deleteImage = async (url: string) => {
  try {
    // Extract the blob path from the URL
    // Vercel Blob URLs format: https://[hash].public.blob.vercel-storage.com/[filename]
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // Remove leading slash to get the blob path
    const blobPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
    
    await del(blobPath, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error to prevent breaking the flow if image deletion fails
  }
};
