"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
    children: React.ReactNode;
    code: string;
    title?: string;
}

export function ComponentPreview({ children, code, title }: ComponentPreviewProps) {
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

    return (
        <div className="rounded-lg border border-border overflow-hidden">
            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-border bg-zinc-950">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("preview")}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === "preview"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Preview
                        {activeTab === "preview" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("code")}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === "code"
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Code
                        {activeTab === "code" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                        )}
                    </button>
                </div>
                {title && (
                    <span className="pr-4 text-xs text-muted-foreground">{title}</span>
                )}
            </div>

            {/* Content */}
            <div className="relative">
                {/* Preview Panel */}
                <div
                    className={`${activeTab === "preview" ? "block" : "hidden"
                        } min-h-[200px] flex items-center justify-center p-8 bg-background`}
                >
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {children}
                    </div>
                </div>

                {/* Code Panel */}
                <div className={activeTab === "code" ? "block" : "hidden"}>
                    <CodeBlock code={code} language="tsx" />
                </div>
            </div>
        </div>
    );
}

// Compact preview for showing multiple variants
interface ComponentShowcaseProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    code: string;
}

export function ComponentShowcase({
    title,
    description,
    children,
    code,
}: ComponentShowcaseProps) {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
            </div>
            <ComponentPreview code={code}>{children}</ComponentPreview>
        </div>
    );
}
