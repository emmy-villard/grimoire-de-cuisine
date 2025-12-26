import { CONFIG } from "../config/config.js";

export default async function saveImg(img) {
    const formData = new FormData();
    const api_url = CONFIG.apiBaseUrl;
    formData.append('image', img);
    const response = await fetch(`${api_url}/uploads`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const { imageUrl } = await response.json();
    return imageUrl;
}