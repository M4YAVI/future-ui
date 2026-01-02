import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Alert } from "@/components/ui/alert";

export default function AlertPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Alert</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a callout for user attention with different severity levels.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Default"
                description="A simple alert message."
                code={`<Alert title="Heads up!">
  You can add components to your app using the CLI.
</Alert>`}
            >
                <Alert title="Heads up!" className="w-full max-w-md">
                    You can add components to your app using the CLI.
                </Alert>
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/alert.tsx</code>:
                </p>
                <CodeBlock
                    code={`"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";

type AlertVariant = "default" | "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
  default: "border-border bg-muted/50 text-foreground",
  info: "border-info/30 bg-info/10 text-info",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  error: "border-error/30 bg-error/10 text-error",
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "default", title, dismissible, onDismiss, children, ...props }, ref) => {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={\`relative flex gap-3 rounded-lg border p-4 \${variantStyles[variant]} \${className}\`}
        {...props}
      >
        <div className="flex-1">
          {title && <h5 className="mb-1 font-medium">{title}</h5>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {dismissible && (
          <button onClick={() => { setDismissed(true); onDismiss?.(); }} aria-label="Dismiss">
            ✕
          </button>
        )}
      </div>
    );
  }
);`}
                    language="tsx"
                    filename="alert.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { Alert } from "@/components/ui/alert";

export function MyComponent() {
  return (
    <Alert variant="success" title="Success!">
      Your changes have been saved.
    </Alert>
  );
}`}
                    language="tsx"
                />
            </section>

            {/* Variants */}
            <ComponentShowcase
                title="Variants"
                description="Different alert styles for different severity levels."
                code={`<Alert variant="default" title="Default">A default alert.</Alert>
<Alert variant="info" title="Info">Informational message.</Alert>
<Alert variant="success" title="Success">Operation completed!</Alert>
<Alert variant="warning" title="Warning">Please review your input.</Alert>
<Alert variant="error" title="Error">Something went wrong.</Alert>`}
            >
                <div className="flex flex-col gap-3 w-full max-w-md">
                    <Alert variant="default" title="Default">A default alert message.</Alert>
                    <Alert variant="info" title="Info">Informational message for the user.</Alert>
                    <Alert variant="success" title="Success">Operation completed successfully!</Alert>
                    <Alert variant="warning" title="Warning">Please review your input.</Alert>
                    <Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>
                </div>
            </ComponentShowcase>

            {/* Dismissible */}
            <ComponentShowcase
                title="Dismissible"
                description="Alert that can be dismissed by the user."
                code={`<Alert variant="info" title="Tip" dismissible>
  You can dismiss this alert by clicking the X button.
</Alert>`}
            >
                <Alert variant="info" title="Tip" dismissible className="w-full max-w-md">
                    You can dismiss this alert by clicking the X button.
                </Alert>
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
                                    &quot;default&quot; | &quot;info&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">title</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">-</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">dismissible</td>
                                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                                <td className="px-4 py-3 text-muted-foreground">false</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">onDismiss</td>
                                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                                <td className="px-4 py-3 text-muted-foreground">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
