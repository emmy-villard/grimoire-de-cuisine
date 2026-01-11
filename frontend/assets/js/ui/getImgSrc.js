import { CONFIG } from "../config/config.js";

const DEFAULT_IMG = "/assets/img/default.webp";
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]"]);

/**
 * Resolves the proper `src` attribute for recipe pictures based on the current mode.
 * @param {string | null | undefined} url Stored image URL or localStorage key.
 * @returns {string} Browser-usable image source.
 */
export default function getImgSrc(url) {
    if (!url) {
        return DEFAULT_IMG;
    }

    if (CONFIG.mode === "DEMO") {
        if (url.startsWith("http")) {
            return normalizeDemoHttpUrl(url) ?? url;
        }

        const dataImage = localStorage.getItem(url);
        if (dataImage) {
            return "data:image/png;base64," + dataImage;
        }
        return DEFAULT_IMG;
    }

    return url;
}

/**
 * Converts localhost absolute URLs (utilisées par les recettes de démonstration) en chemins accessibles depuis n'importe quel client.
 * @param {string} url Image URL tel que stocké dans le JSON embarqué.
 * @returns {string | null} Un chemin réécrit ou null si aucun ajustement n'est nécessaire.
 */
function normalizeDemoHttpUrl(url) {
    try {
        const parsedUrl = new URL(url);
        if (!LOOPBACK_HOSTS.has(parsedUrl.hostname)) {
            return null;
        }
        if (!parsedUrl.pathname || parsedUrl.pathname === "/") {
            return DEFAULT_IMG;
        }
        return parsedUrl.pathname;
    } catch (error) {
        console.warn("URL d'image de démonstration invalide", error);
        return null;
    }
}