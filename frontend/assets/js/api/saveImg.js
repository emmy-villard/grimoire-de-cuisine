export default async function saveImg(img) {
    const formData = new FormData();
    formData.append('image', img);
    const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const { imageUrl } = await response.json();
    return imageUrl;
}