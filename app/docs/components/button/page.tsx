import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

export default function ButtonPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Button</h1>
                <p className="text-lg text-muted-foreground">
                    Interactive button component with multiple variants and sizes.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Default"
                description="The default button style."
                code={`<Button>Button</Button>`}
            >
                <Button>Button</Button>
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/button.tsx</code>:
                </p>
                <CodeBlock
                    code={`import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "default" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-foreground text-background hover:bg-foreground/90",
  secondary: "bg-muted text-foreground hover:bg-muted/80",
  ghost: "hover:bg-muted hover:text-foreground",
  outline: "border border-border bg-transparent hover:bg-muted hover:text-foreground",
  destructive: "bg-error text-foreground hover:bg-error/90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-lg",
  icon: "h-10 w-10 rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={\`
          inline-flex items-center justify-center gap-2 font-medium
          transition-all duration-200 ease-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          disabled:pointer-events-none disabled:opacity-50
          active:scale-[0.98]
          \${variantStyles[variant]}
          \${sizeStyles[size]}
          \${className}
        \`}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";`}
                    language="tsx"
                    filename="button.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { Button } from "@/components/ui/button";

export function MyComponent() {
  return <Button variant="default">Click me</Button>;
}`}
                    language="tsx"
                />
            </section>

            {/* Variants */}
            <ComponentShowcase
                title="Variants"
                description="Different button styles for different contexts."
                code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>`}
            >
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
            </ComponentShowcase>

            {/* Sizes */}
            <ComponentShowcase
                title="Sizes"
                description="Buttons come in three sizes."
                code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
            >
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
            </ComponentShowcase>

            {/* States */}
            <ComponentShowcase
                title="States"
                description="Loading and disabled states."
                code={`<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`}
            >
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
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
                                    &quot;default&quot; | &quot;secondary&quot; | &quot;ghost&quot; | &quot;outline&quot; | &quot;destructive&quot;
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">size</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;icon&quot;
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">loading</td>
                                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                                <td className="px-4 py-3 text-muted-foreground">false</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                                <td className="px-4 py-3 text-muted-foreground">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
