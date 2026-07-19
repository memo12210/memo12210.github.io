import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves plain static files: no Node server, no image optimizer.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Emit /blog/post/index.html so Pages resolves nested routes without a rewrite layer.
  trailingSlash: true,
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
