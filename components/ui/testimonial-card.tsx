"use client";

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
        const escapedHighlights = highlights.map((h) =>
            h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );
        const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
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
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
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
}
