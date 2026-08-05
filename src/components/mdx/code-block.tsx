"use client";

import { useRef, useState, type ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Highlighting now happens at build time (rehype-pretty-code), so the only
// client-side behaviour left here is the copy button.
export function CodeBlock({
  children,
  className,
  ...props
}: ComponentProps<"pre">) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <pre
      ref={preRef}
      {...props}
      className={cn("relative p-3! m-0! overflow-x-auto", className)}
    >
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon"
        className="absolute size-8 text-primary cursor-pointer right-3 top-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity rounded-md border border-border shadow-none"
        aria-label="Copy code"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
      {children}
    </pre>
  );
}
