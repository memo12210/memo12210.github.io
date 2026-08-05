import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

const posts = defineCollection({
    name: "posts",
    directory: "content",
    include: "**/*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string(),
        image: z.string().optional(),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm],
            // Highlight at build time. Doing it in the browser pulled Shiki and
            // its grammars into the client bundle and reflowed every code block
            // after hydration. `defaultColor: false` emits --shiki-light /
            // --shiki-dark custom properties, which globals.css already switches on.
            rehypePlugins: [
                [
                    rehypePrettyCode,
                    {
                        theme: { light: "github-light", dark: "github-dark" },
                        defaultColor: false,
                        keepBackground: false,
                    },
                ],
            ],
        });
        return {
        ...document,
            mdx,
        };
    },
});

export default defineConfig({
    content: [posts],
});

