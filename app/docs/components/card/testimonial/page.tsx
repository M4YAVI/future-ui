import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { TestimonialCard } from "@/components/ui/testimonial-card";

const INSTALLATION_CODE = `"use client";

import { useRef, useState } from "react";

export interface TestimonialAuthor {
  name: string;
  role: string;
  company: string;
  image: string;
}

export interface TestimonialProps {
  quote: string;
  highlights: string[];
  author: TestimonialAuthor;
}

/**
 * A sophisticated dark-mode testimonial card.
 * Features:
 * - Subtle gradient border (simulated via background layers)
 * - Mouse-following spotlight effect
 * - Semantic text highlighting
 * - Grayscale-to-color transition on avatar hover
 */
export function TestimonialCard({ quote, highlights, author }: TestimonialProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  // Helper to split text and apply highlighting
  const renderQuote = () => {
    // Escaping regex characters
    const escapedHighlights = highlights.map((h) =>
      h.replace(/[.*+?^$\{}/()|[\\]\\\\]/g, "\\\\$&")
    );
    const regex = new RegExp(\`(\${escapedHighlights.join("|")})\`, "gi");
    const parts = quote.split(regex);

    return parts.map((part, i) => {
      const isHighlight = highlights.some(
        (h) => h.toLowerCase() === part.toLowerCase()
      );
      return (
        <span
          key={i}
          className={
            isHighlight
              ? "text-white font-medium drop-shadow-sm"
              : "text-zinc-500"
          }
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 p-8 sm:p-10 transition-colors duration-500"
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
            opacity,
            background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.06), transparent 40%)\`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full gap-8">
        {/* Quote */}
        <blockquote className="text-xl sm:text-2xl leading-relaxed sm:leading-relaxed tracking-tight">
          &ldquo;{renderQuote()}&rdquo;
        </blockquote>

        {/* Author Footer */}
        <div className="flex items-center gap-4 pt-2">
          {/* Avatar */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 group">
            <img
              src={author.image}
              alt={author.name}
              className="h-full w-full object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0 hover:scale-110"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <span className="text-base font-medium text-zinc-200">
              {author.name}
            </span>
            <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase">
              {author.company}{" "}
              <span className="mx-1 text-zinc-700">-</span> {author.role}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Grain Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}`;

export default function TestimonialPage() {
  return (
    <div className="space-y-10 animate-fade-up">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Testimonial Card</h1>
        <p className="text-lg text-muted-foreground">
          A sophisticated testimonial card with spotlight effect and semantic text highlighting.
        </p>
      </div>

      {/* Preview */}
      <ComponentShowcase
        title="Interactive Spotlight"
        description="Move your mouse over the card to see the spotlight effect."
        code={`<TestimonialCard
  quote="Future UI has completely transformed how we build interfaces. The components are beautifully designed and incredibly easy to customize."
  highlights={["transformed", "beautifully designed", "easy to customize"]}
  author={{
    name: "Sarah Chen",
    role: "Lead Designer",
    company: "TechCorp",
    image: "https://i.pravatar.cc/150?u=sarah"
  }}
/>`}
      >
        <TestimonialCard
          quote="Future UI has completely transformed how we build interfaces. The components are beautifully designed and incredibly easy to customize."
          highlights={["transformed", "beautifully designed", "easy to customize"]}
          author={{
            name: "Sarah Chen",
            role: "Lead Designer",
            company: "TechCorp",
            image: "https://i.pravatar.cc/150?u=sarah",
          }}
        />
      </ComponentShowcase>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Copy the following code into <code>components/ui/testimonial-card.tsx</code>:
        </p>
        <CodeBlock
          code={INSTALLATION_CODE}
          language="tsx"
          filename="testimonial-card.tsx"
          showLineNumbers
        />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { TestimonialCard } from "@/components/ui/testimonial-card";

export function Testimonials() {
  return (
    <TestimonialCard
      quote="Your testimonial text here with highlighted words."
      highlights={["highlighted", "words"]}
      author={{
        name: "John Doe",
        role: "CEO",
        company: "Acme Inc",
        image: "/avatar.jpg"
      }}
    />
  );
}`}
          language="tsx"
        />
      </section>

      {/* Another Example */}
      <ComponentShowcase
        title="Product Review"
        description="Perfect for showcasing customer feedback."
        code={`<TestimonialCard
  quote="The attention to detail is incredible. Every component feels polished and production-ready right out of the box."
  highlights={["attention to detail", "polished", "production-ready"]}
  author={{
    name: "Alex Rivera",
    role: "Frontend Engineer",
    company: "StartupXYZ",
    image: "https://i.pravatar.cc/150?u=alex"
  }}
/>`}
      >
        <TestimonialCard
          quote="The attention to detail is incredible. Every component feels polished and production-ready right out of the box."
          highlights={["attention to detail", "polished", "production-ready"]}
          author={{
            name: "Alex Rivera",
            role: "Frontend Engineer",
            company: "StartupXYZ",
            image: "https://i.pravatar.cc/150?u=alex",
          }}
        />
      </ComponentShowcase>

      {/* Features */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
            <span><strong className="text-foreground">Spotlight Effect</strong> — Mouse-following radial gradient for interactivity</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
            <span><strong className="text-foreground">Text Highlighting</strong> — Emphasize key phrases in the quote</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
            <span><strong className="text-foreground">Avatar Hover</strong> — Grayscale to color transition on hover</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
            <span><strong className="text-foreground">Grain Texture</strong> — Subtle noise overlay for depth</span>
          </li>
        </ul>
      </section>

      {/* Props Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-mono text-xs">quote</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">The testimonial text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">highlights</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">Words/phrases to highlight in white</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">author</td>
                <td className="px-4 py-3 text-muted-foreground">TestimonialAuthor</td>
                <td className="px-4 py-3 text-muted-foreground">Author info (name, role, company, image)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
