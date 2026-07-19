// Next emits generated metadata images as extensionless files (out/opengraph-image).
// GitHub Pages types those as application/octet-stream, which social scrapers
// reject. Copy each to a .png sibling and repoint the references.
import { readdir, readFile, writeFile, copyFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const OUT = join(process.cwd(), "out");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const p = join(dir, e.name);
      return e.isDirectory() ? walk(p) : [p];
    })
  );
  return files.flat();
}

const files = await walk(OUT);

const images = files.filter((f) => /(^|[\\/])(opengraph|twitter)-image$/.test(f));
if (images.length === 0) {
  console.log("fix-og-extensions: no extensionless metadata images found");
}

for (const img of images) {
  const png = `${img}.png`;
  await copyFile(img, png);
  console.log(`fix-og-extensions: ${relative(OUT, png)}`);
}

// Repoint references in every emitted text file.
const names = images.map((f) => f.split(/[\\/]/).pop());
const unique = [...new Set(names)];
const textFiles = files.filter((f) => /\.(html|txt|json|js)$/.test(f));

for (const file of textFiles) {
  const original = await readFile(file, "utf8");
  let updated = original;
  for (const name of unique) {
    // Only rewrite when not already followed by an extension.
    updated = updated.replaceAll(
      new RegExp(`${name}(?!\\.png)(?=\\?|["'\\\\ ])`, "g"),
      `${name}.png`
    );
  }
  if (updated !== original) await writeFile(file, updated, "utf8");
}

await stat(join(OUT, "opengraph-image.png"));
console.log("fix-og-extensions: done");

// Next writes RSC prefetch payloads into nested __next.* directories, but the
// client requests them as a single dot-joined filename. Without a flat copy
// every prefetch 404s and internal links fall back to full page loads.
async function flattenPrefetchPayloads(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await walk(full)) {
        const flat = [entry.name, ...relative(full, file).split(/[\\/]/)].join(".");
        await copyFile(file, join(dir, flat));
      }
    } else {
      await flattenPrefetchPayloads(full);
    }
  }
}

await flattenPrefetchPayloads(OUT);
console.log("fix-og-extensions: flattened RSC prefetch payloads");
