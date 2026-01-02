import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { FloatingHighlight } from "@/components/ui/floating-highlight";

export default function FloatingHighlightPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Floating Highlight</h1>
                <p className="text-lg text-muted-foreground">
                    A magnetic floating background that follows your cursor between interactive items.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Interactive Menu"
                description="Hover over the items to see the background glide."
                code={`<FloatingHighlight
  items={[
    { id: "1", label: "Home", href: "#" },
    { id: "2", label: "About", href: "#" },
    { id: "3", label: "Projects", href: "#" },
    { id: "4", label: "Contact", href: "#" },
  ]}
/>`}
            >
                <div className="w-full max-w-md border border-zinc-800 rounded-xl p-4 bg-black">
                    <FloatingHighlight
                        items={[
                            { id: "1", label: "Home", href: "#" },
                            { id: "2", label: "About", href: "#" },
                            { id: "3", label: "Projects", href: "#" },
                            { id: "4", label: "Contact", href: "#" },
                        ]}
                    />
                </div>
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/floating-highlight.tsx</code>:
                </p>
                <CodeBlock
                    code={`"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FloatingHighlightProps {
  items: {
    id: string;
    label: string;
    href: string;
  }[];
  className?: string;
}

export function FloatingHighlight({ items, className }: FloatingHighlightProps) {
  const [hoverStyle, setHoverStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const item = itemsRef.current[index];
    const container = containerRef.current;

    if (!item || !container) return;

    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    setHoverStyle({
      left: itemRect.left - containerRect.left,
      top: itemRect.top - containerRect.top,
      width: itemRect.width,
      height: itemRect.height,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      className={cn("relative grid grid-cols-1 gap-2 sm:grid-cols-2", className)}
    >
      {/* Floating Hover Rectangle */}
      <div
        className="pointer-events-none absolute rounded-xl bg-zinc-800/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          left: hoverStyle.left,
          top: hoverStyle.top,
          width: hoverStyle.width,
          height: hoverStyle.height,
          opacity: hoverStyle.opacity,
        }}
      />

      {items.map((item, index) => (
        <Link
          key={item.id}
          href={item.href}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="relative z-10 block p-4 text-center text-sm font-medium text-zinc-400 transition-colors hover:text-foreground"
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}`}
                    language="tsx"
                    filename="floating-highlight.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { FloatingHighlight } from "@/components/ui/floating-highlight";

export function Navigation() {
  return (
    <FloatingHighlight
      items={[
        { id: "home", label: "Home", href: "/" },
        { id: "docs", label: "Docs", href: "/docs" },
      ]}
    />
  );
}`}
                    language="tsx"
                />
            </section>
        </div>
    );
}
