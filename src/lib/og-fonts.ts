import { readFile } from "node:fs/promises";
import { join } from "node:path";

// OG images are baked at build time under the Node runtime, so fonts are read
// from disk rather than fetched.
export async function getFontData() {
    try {
        const fontsDir = join(process.cwd(), "public", "fonts");
        const [cabinetGrotesk, clashDisplay] = await Promise.all([
            readFile(join(fontsDir, "CabinetGrotesk-Medium.ttf")),
            readFile(join(fontsDir, "ClashDisplay-Semibold.ttf")),
        ]);
        return { cabinetGrotesk, clashDisplay };
    } catch (error) {
        console.error("Failed to load fonts:", error);
        return null;
    }
}

// Inlined as a data URI: the build must not depend on the site already being
// reachable at its public URL.
export async function getAvatarDataUri(avatarUrl?: string) {
    if (!avatarUrl) return undefined;
    try {
        const file = await readFile(join(process.cwd(), "public", avatarUrl));
        const ext = avatarUrl.split(".").pop()?.toLowerCase();
        const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
        return `data:${mime};base64,${file.toString("base64")}`;
    } catch (error) {
        console.error("Failed to load avatar:", error);
        return undefined;
    }
}
