"use client";

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
                className={`group relative z-10 flex w-full cursor-pointer flex-col items-center justify-center py-4 transition-colors duration-300 rounded-xl border border-transparent hover:border-zinc-800 ${className}`}
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
                                "--x": `${position.x}px`,
                                "--y": `${position.y}px`,
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

SpotlightCard.displayName = "SpotlightCard";
