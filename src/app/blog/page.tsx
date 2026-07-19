import BlurFade from "@/components/magicui/blur-fade";
import BlogList, { type BlogListItem } from "@/components/blog-list";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function BlogPage() {
  const sortedPosts: BlogListItem[] = [...allPosts]
    .sort((a, b) =>
      new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
    )
    .map((post) => ({
      slug: post._meta.path.replace(/\.mdx$/, ""),
      title: post.title,
      publishedAt: post.publishedAt,
    }));

  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Blog <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">{sortedPosts.length} posts</span></h1>
        <p className="text-sm text-muted-foreground mb-8">
          My thoughts on software development, life, and more.
        </p>
      </BlurFade>

      <Suspense fallback={null}>
        <BlogList posts={sortedPosts} />
      </Suspense>
    </section>
  );
}
