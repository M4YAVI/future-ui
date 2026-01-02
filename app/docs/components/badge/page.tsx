import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

export default function BadgePage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
                <p className="text-lg text-muted-foreground">
                    A small status indicator for labels, counts, and statuses.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Default"
                description="The default badge style."
                code={`<Badge>Badge</Badge>`}
            >
                <Badge>Badge</Badge>
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/badge.tsx</code>:
                </p>
                <CodeBlock
                    code={`import { type HTMLAttributes, forwardRef } from "react";

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "error" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-foreground text-background",
  secondary: "bg-muted text-muted-foreground",
  success: "bg-success/20 text-success border-success/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  error: "bg-error/20 text-error border-error/30",
  outline: "bg-transparent border-border text-foreground",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={\`
          inline-flex items-center rounded-full border px-2.5 py-0.5 
          text-xs font-semibold transition-colors
          \${variantStyles[variant]}
          \${className}
        \`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";`}
                    language="tsx"
                    filename="badge.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { Badge } from "@/components/ui/badge";

export function MyComponent() {
  return <Badge variant="success">Active</Badge>;
}`}
                    language="tsx"
                />
            </section>

            {/* Variants */}
            <ComponentShowcase
                title="Variants"
                description="Different badge styles for different contexts."
                code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outline">Outline</Badge>`}
            >
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
            </ComponentShowcase>

            {/* Use Cases */}
            <ComponentShowcase
                title="Use Cases"
                description="Common badge use cases."
                code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="secondary">3 new</Badge>`}
            >
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="error">Failed</Badge>
                <Badge variant="secondary">3 new</Badge>
            </ComponentShowcase>

            {/* Props Table */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Props</h2>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Prop</th>
                                <th className="px-4 py-3 text-left font-medium">Type</th>
                                <th className="px-4 py-3 text-left font-medium">Default</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">variant</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    &quot;default&quot; | &quot;secondary&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot; | &quot;outline&quot;
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
