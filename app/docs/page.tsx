import Link from "next/link";
import { CodeBlock } from "@/components/code-block";

export default function DocsPage() {
    return (
        <div className="space-y-8 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
                <p className="text-lg text-muted-foreground">
                    A minimalist collection of beautifully designed components for your next project.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">What is Future UI?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Future UI is a collection of reusable components that you can copy and paste into your apps.
                        It&apos;s designed to be minimal, accessible, and easy to customize.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Unlike traditional component libraries, you don&apos;t install Future UI as a dependency.
                        Instead, you pick the components you need and copy them directly into your project.
                        This gives you complete control and ownership of the code.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Philosophy</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span><strong className="text-foreground">Minimal</strong> — No bloat. Only essential code.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span><strong className="text-foreground">Accessible</strong> — Built with accessibility in mind.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span><strong className="text-foreground">Customizable</strong> — Uses Tailwind CSS for easy styling.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span><strong className="text-foreground">Open Source</strong> — Free to use and modify.</span>
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Quick Start</h2>
                    <p className="text-muted-foreground">
                        Start by browsing the components and copying the code you need:
                    </p>

                    <div className="not-prose">
                        <CodeBlock
                            code={`// 1. Copy the component code
// 2. Create a file in your project (e.g., components/ui/button.tsx)
// 3. Paste the code
// 4. Import and use

import { Button } from "@/components/ui/button";

export function MyComponent() {
  return <Button>Click me</Button>;
}`}
                            language="tsx"
                        />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Requirements</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span>React 18 or 19</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span>Tailwind CSS v4</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                            <span>TypeScript (optional but recommended)</span>
                        </li>
                    </ul>
                </section>

                {/* Next Steps */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                        href="/docs/installation"
                        className="flex-1 group flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-muted-foreground/30 hover:bg-muted/30"
                    >
                        <div>
                            <p className="font-medium">Installation</p>
                            <p className="text-sm text-muted-foreground">Set up your project</p>
                        </div>
                        <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link
                        href="/docs/components/button"
                        className="flex-1 group flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-muted-foreground/30 hover:bg-muted/30"
                    >
                        <div>
                            <p className="font-medium">Components</p>
                            <p className="text-sm text-muted-foreground">Browse all components</p>
                        </div>
                        <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
