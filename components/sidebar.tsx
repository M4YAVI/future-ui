"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
    name: string;
    href: string;
    children?: NavItem[];
}

interface NavSection {
    [key: string]: NavItem[];
}

const navigation: NavSection = {
    "Getting Started": [
        { name: "Introduction", href: "/docs" },
        { name: "Installation", href: "/docs/installation" },
    ],
    Components: [
        { name: "Button", href: "/docs/components/button" },
        {
            name: "Card",
            href: "/docs/components/card",
            children: [
                { name: "Basic Card", href: "/docs/components/card" },
                { name: "Testimonial Card", href: "/docs/components/card/testimonial" },
                { name: "Spotlight Card", href: "/docs/components/card/spotlight" },
            ],
        },
        { name: "Input", href: "/docs/components/input" },
        { name: "Badge", href: "/docs/components/badge" },
        { name: "Alert", href: "/docs/components/alert" },
        { name: "Tabs", href: "/docs/components/tabs" },
        {
            name: "Hover",
            href: "/docs/components/hover",
            children: [
                { name: "Floating Highlight", href: "/docs/components/hover/floating" },
            ],
        },
        { name: "Editor", href: "/docs/components/editor" },
    ],
};

export function Sidebar() {
    const pathname = usePathname();
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
        Card: pathname.startsWith("/docs/components/card"),
    });

    const toggleSection = (section: string) => {
        setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleItem = (itemName: string) => {
        setExpandedItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
    };

    const isActive = (href: string) => pathname === href;
    const isParentActive = (href: string) => pathname.startsWith(href);

    return (
        <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border md:sticky md:block">
            <div className="h-full overflow-y-auto py-6 pr-6 lg:py-8">
                <nav className="flex flex-col gap-6">
                    {Object.entries(navigation).map(([section, items]) => (
                        <div key={section}>
                            <button
                                onClick={() => toggleSection(section)}
                                className="flex w-full items-center justify-between text-sm font-semibold text-foreground mb-3 hover:text-muted-foreground transition-colors"
                                type="button"
                            >
                                {section}
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${collapsedSections[section] ? "-rotate-90" : ""
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <ul
                                className={`flex flex-col gap-1 overflow-hidden transition-all duration-200 ${collapsedSections[section] ? "h-0" : "h-auto"
                                    }`}
                            >
                                {items.map((item) => (
                                    <li key={item.href}>
                                        {item.children ? (
                                            // Parent item with children
                                            <div>
                                                <button
                                                    onClick={() => toggleItem(item.name)}
                                                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${isParentActive(item.href)
                                                        ? "text-foreground font-medium"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                        }`}
                                                    type="button"
                                                >
                                                    {item.name}
                                                    <svg
                                                        className={`h-3 w-3 transition-transform duration-200 ${expandedItems[item.name] ? "rotate-90" : ""
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </button>

                                                {/* Nested children */}
                                                <ul
                                                    className={`ml-3 mt-1 flex flex-col gap-1 border-l border-border pl-3 overflow-hidden transition-all duration-200 ${expandedItems[item.name] ? "h-auto opacity-100" : "h-0 opacity-0"
                                                        }`}
                                                >
                                                    {item.children.map((child) => (
                                                        <li key={child.href}>
                                                            <Link
                                                                href={child.href}
                                                                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${isActive(child.href)
                                                                    ? "bg-muted text-foreground font-medium"
                                                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                                    }`}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            // Regular item without children
                                            <Link
                                                href={item.href}
                                                className={`block rounded-md px-3 py-2 text-sm transition-colors ${isActive(item.href)
                                                    ? "bg-muted text-foreground font-medium"
                                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
