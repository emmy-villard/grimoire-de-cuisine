import { CONFIG } from "../config/config.js";

/**
 * Resolves the proper `src` attribute for recipe pictures based on the current mode.
 * @param {string | null} url Stored image URL or localStorage key.
 * @returns {string} Browser-usable image source.
 */
export default function getImgSrc(url) {
    if (!url) {
        return '/assets/img/default.webp';  
    }
    if (CONFIG.mode == "DEMO") {
        if(url.startsWith('http')) {
            return url;
        }
        const dataImage = localStorage.getItem(url);
        return "data:image/png;base64," + dataImage;
    }
    return url;
}