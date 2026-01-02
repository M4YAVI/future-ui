import Link from "next/link";

const components = [
    {
        name: "Button",
        description: "Interactive button with multiple variants and sizes.",
        href: "/docs/components/button",
    },
    {
        name: "Card",
        description: "Container with variants: Basic, Testimonial, and more coming soon.",
        href: "/docs/components/card",
        hasChildren: true,
    },
    {
        name: "Input",
        description: "Text input field with label and validation support.",
        href: "/docs/components/input",
    },
    {
        name: "Badge",
        description: "Small status indicator for labels and counts.",
        href: "/docs/components/badge",
    },
    {
        name: "Alert",
        description: "Feedback messages for user actions and system states.",
        href: "/docs/components/alert",
    },
    {
        name: "Tabs",
        description: "Organize content into separate views.",
        href: "/docs/components/tabs",
    },
];

export default function ComponentsPage() {
    return (
        <div className="space-y-8 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Components</h1>
                <p className="text-lg text-muted-foreground">
                    A collection of beautifully designed, accessible components.
                </p>
            </div>

            {/* Components Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
                {components.map((component) => (
                    <Link
                        key={component.name}
                        href={component.href}
                        className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-muted/20"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{component.name}</h3>
                                {component.hasChildren && (
                                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                        +variants
                                    </span>
                                )}
                            </div>
                            <svg
                                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
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
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {component.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
