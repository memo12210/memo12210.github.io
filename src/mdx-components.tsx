import { CodeBlock } from "@/components/mdx/code-block";
import { MediaContainer } from "@/components/mdx/media-container";
import type { ComponentProps } from "react";

type CodeProps = ComponentProps<"code"> & {
  "data-language"?: string;
};

export const mdxComponents = {
  MediaContainer,
  // rehype-pretty-code wraps each block in a <figure>; rendering it as a plain
  // div keeps the previous flush spacing (typography gives <figure> its own
  // margins) while still providing the bordered container and hover group.
  figure: ({ children, ...props }: ComponentProps<"figure">) =>
    "data-rehype-pretty-code-figure" in props ? (
      <div className="group relative rounded-xl overflow-hidden border border-border">
        {children}
      </div>
    ) : (
      <figure {...props}>{children}</figure>
    ),
  figcaption: ({ children, ...props }: ComponentProps<"figcaption">) =>
    "data-rehype-pretty-code-title" in props ? (
      <div className="p-3 text-xs font-medium border-b border-border bg-muted/50 text-foreground">
        {children}
      </div>
    ) : (
      <figcaption {...props}>{children}</figcaption>
    ),
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  hr: (props: ComponentProps<"hr">) => (
    <div className="my-10 flex w-full items-center" {...props}>
      <div
        className="flex-1 h-px bg-border"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      />
    </div>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 border border-border rounded-xl overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table
          className="m-0! w-full min-w-full border-separate border-spacing-0"
          {...props}
        />
      </div>
    </div>
  ),
  code: ({ children, ...props }: CodeProps) => {
    if (props["data-language"]) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-muted/60 dark:bg-muted/40 text-sm font-mono text-foreground/90"
        {...props}
      >
        {children}
      </code>
    );
  },
} as const;

