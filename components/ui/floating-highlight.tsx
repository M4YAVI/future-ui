"use client";

import React, { useState, useRef, useEffect } from "react";
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
}
