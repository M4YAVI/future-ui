import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function SpotlightCardPage() {
  return (
    <div className="space-y-10 animate-fade-up">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Spotlight Card</h1>
        <p className="text-lg text-muted-foreground">
          A minimalist card with a spotlight gradient reveal effect on hover. Perfect for navigation or feature highlights.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
        title="Interactive Example"
        description="Hover over the cards to see the spotlight effect tracing your mouse movement."
        code={`<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
  <SpotlightCard
    item={{ label: "Design", description: "System" }}
  />
  <SpotlightCard
    item={{ label: "Develop", description: "Frontend" }}
  />
  <SpotlightCard
    item={{ label: "Ship", description: "Deploy" }}
  />
</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full border border-zinc-800/50 p-8 rounded-xl bg-black/50">
          <SpotlightCard
            item={{ label: "Design", description: "System" }}
          />
          <SpotlightCard
            item={{ label: "Develop", description: "Frontend" }}
          />
          <SpotlightCard
            item={{ label: "Ship", description: "Deploy" }}
          />
        </div>
      </ComponentShowcase>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Copy the following code into <code>components/ui/spotlight-card.tsx</code>:
        </p>
        <CodeBlock
          code={`"use client";

import { forwardRef, useRef, useState } from "react";

export interface SpotlightItem {
  label: string;
  description?: string;
}

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: SpotlightItem;
  onMouseEnter?: () => void;
}

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ item, onMouseEnter, className, ...props }, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnterLocal = () => {
      setOpacity(1);
      onMouseEnter?.();
    };

    const handleMouseLeaveLocal = () => {
      setOpacity(0);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnterLocal}
        onMouseLeave={handleMouseLeaveLocal}
        className={\`group relative z-10 flex w-full cursor-pointer flex-col items-center justify-center py-4 transition-colors duration-300 rounded-xl border border-transparent hover:border-zinc-800 \${className}\`}
        {...props}
      >
        {/* Spotlight Gradient Layer */}
        <div
          ref={divRef}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ opacity }}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1)_0%,transparent_50%)]"
            style={
              {
                "--x": \`\${position.x}px\`,
                "--y": \`\${position.y}px\`,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Inner Container */}
        <div className="relative flex flex-col items-center justify-center px-8 py-3 text-center">
          <span className="font-sans text-3xl font-bold tracking-tighter text-zinc-600 transition-colors duration-200 group-hover:text-white sm:text-4xl md:text-5xl">
            {item.label}
          </span>
          {item.description && (
            <span className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-800 transition-colors duration-300 group-hover:text-zinc-500">
              {item.description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";`}
          language="tsx"
          filename="spotlight-card.tsx"
          showLineNumbers
        />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Navigation() {
  return (
    <div className="flex gap-4">
      <SpotlightCard item={{ label: "Home", description: "Start Here" }} />
      <SpotlightCard item={{ label: "Docs", description: "Read More" }} />
    </div>
  );
}`}
          language="tsx"
        />
      </section>
    </div>
  );
}
