import { CONFIG } from "../config/config.js";

export default function getImgSrc(url) {
    if (CONFIG.mode == "DEMO") {
        if(url.startsWith('http')) {
            return url;
        }
        const dataImage = localStorage.getItem(url);
        return "data:image/png;base64," + dataImage;
    }
    return url ?? '/public/assets/img/default.webp';
}