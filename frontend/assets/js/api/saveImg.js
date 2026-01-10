import { CONFIG } from "../config/config.js";
import getAuthHeaders from './getAuthHeaders.js';

/**
 * Uploads an image file to the backend and returns the resulting public URL.
 * @param {File} img File selected from the `<input type="file">` control.
 * @returns {Promise<string>} Absolute URL built by the backend.
 */
export default async function saveImg(img) {
    const formData = new FormData();
    const api_url = CONFIG.apiBaseUrl;
    formData.append('image', img);
    const response = await fetch(`${api_url}/uploads`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
        },
        body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    const { imageUrl } = await response.json();
    return imageUrl;
}