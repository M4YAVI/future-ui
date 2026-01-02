import Link from "next/link";

export default function HoverPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Hover Effects</h1>
                <p className="text-lg text-muted-foreground">
                    Interactive hover states and animations for enhanced user engagement.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Variants</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link
                        href="/docs/components/hover/floating"
                        className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-muted/20"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">Floating Highlight</h3>
                            <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            A fluid background element that glides between items on hover.
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
}
