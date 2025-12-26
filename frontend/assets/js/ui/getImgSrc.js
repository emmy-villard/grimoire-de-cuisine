import { CONFIG } from "../config/config.js";

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