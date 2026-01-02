import Link from "next/link";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20">
              <div className="absolute inset-0 bg-gradient-radial from-zinc-500/30 via-transparent to-transparent blur-3xl" />
            </div>
          </div>

          <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center stagger-children">
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Open Source
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="gradient-text">Build beautiful</span>
                <br />
                <span className="text-foreground">interfaces faster</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                A minimalist collection of beautifully designed, accessible components.
                Copy and paste into your apps. Open source.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-foreground px-8 text-sm font-medium text-background transition-all hover:bg-foreground/90 active:scale-[0.98]"
                >
                  Get Started
                </Link>
                <Link
                  href="/docs/components/button"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-border px-8 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
                >
                  Browse Components
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-muted-foreground/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Copy & Paste</h3>
                <p className="text-sm text-muted-foreground">
                  Simply copy the code and paste it into your project. No package installation required.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-muted-foreground/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Customizable</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Tailwind CSS. Easily customize colors, spacing, and styles to match your brand.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-muted-foreground/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">Minimal</h3>
                <p className="text-sm text-muted-foreground">
                  No bloat. Each component is focused and lightweight. Only what you need, nothing more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Components Preview */}
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Components</h2>
              <p className="mt-2 text-muted-foreground">
                A growing collection of components for your next project.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Button", href: "/docs/components/button" },
                { name: "Card", href: "/docs/components/card" },
                { name: "Input", href: "/docs/components/input" },
                { name: "Badge", href: "/docs/components/badge" },
                { name: "Alert", href: "/docs/components/alert" },
                { name: "Tabs", href: "/docs/components/tabs" },
              ].map((component) => (
                <Link
                  key={component.name}
                  href={component.href}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-muted-foreground/30 hover:bg-muted/30"
                >
                  <span className="font-medium">{component.name}</span>
                  <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Next.js and Tailwind CSS. Open source.</p>
        </div>
      </footer>
    </div>
  );
}
