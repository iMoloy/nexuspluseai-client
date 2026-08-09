export const uploadToImgBB = async (imageFile: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data && data.success) {
      return data.data.url;
    }
    throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown upload error';
    console.error('[ImgBB Upload Error]', message);
    // Return Unsplash avatar fallback if API key fails
    return URL.createObjectURL(imageFile);
  }
};
