export default async function saveImg(img, slug) {
    const formData = new FormData();
    formData.append('image', img);
    formData.append('slug', slug);
    const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const { imageUrl } = await response.json();
    return imageUrl;
}