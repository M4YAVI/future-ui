import { CodeBlock } from "@/components/code-block";

export default function InstallationPage() {
    return (
        <div className="space-y-8 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Installation</h1>
                <p className="text-lg text-muted-foreground">
                    How to set up your project to use Future UI components.
                </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">1. Create a new project</h2>
                    <p className="text-muted-foreground">
                        Start by creating a new Next.js project with Tailwind CSS:
                    </p>
                    <CodeBlock
                        code={`npx create-next-app@latest my-app --typescript --tailwind
cd my-app`}
                        language="bash"
                        filename="Terminal"
                    />
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">2. Set up path aliases</h2>
                    <p className="text-muted-foreground">
                        Make sure your <code>tsconfig.json</code> has path aliases configured:
                    </p>
                    <CodeBlock
                        code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
                        language="json"
                        filename="tsconfig.json"
                    />
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">3. Add CSS variables</h2>
                    <p className="text-muted-foreground">
                        Add the following CSS variables to your <code>globals.css</code>:
                    </p>
                    <CodeBlock
                        code={`:root {
  --background: #000000;
  --foreground: #fafafa;
  
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --border: #27272a;
  --ring: #3f3f46;
  
  --card: #09090b;
  --card-foreground: #fafafa;
  
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
  --info: #3b82f6;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-error: var(--error);
  --color-info: var(--info);
}`}
                        language="css"
                        filename="globals.css"
                    />
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">4. Create components folder</h2>
                    <p className="text-muted-foreground">
                        Create a <code>components/ui</code> folder in your project root:
                    </p>
                    <CodeBlock
                        code={`mkdir -p components/ui`}
                        language="bash"
                        filename="Terminal"
                    />
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">5. Copy components</h2>
                    <p className="text-muted-foreground">
                        Now you&apos;re ready! Browse the components and copy the code you need into
                        your <code>components/ui</code> folder.
                    </p>
                </section>

                {/* Success message */}
                <div className="rounded-lg border border-success/30 bg-success/10 p-4">
                    <div className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="font-medium text-success">You&apos;re all set!</p>
                            <p className="text-sm text-success/80 mt-1">
                                Start copying components and building your app.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
