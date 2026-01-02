import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";

export default function InputPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Input</h1>
                <p className="text-lg text-muted-foreground">
                    A text input component with built-in label and error state support.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Default"
                description="A simple text input."
                code={`<Input placeholder="Enter text..." />`}
            >
                <Input placeholder="Enter text..." className="w-[300px]" />
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/input.tsx</code>:
                </p>
                <CodeBlock
                    code={`import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\\s+/g, "-");

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={\`
            flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm
            placeholder:text-muted-foreground transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            disabled:cursor-not-allowed disabled:opacity-50
            \${error ? "border-error" : "border-border"}
            \${className}
          \`}
          {...props}
        />
        {(error || helperText) && (
          <p className={\`text-xs \${error ? "text-error" : "text-muted-foreground"}\`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";`}
                    language="tsx"
                    filename="input.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { Input } from "@/components/ui/input";

export function MyComponent() {
  return <Input label="Email" placeholder="Enter your email" />;
}`}
                    language="tsx"
                />
            </section>

            {/* With Label */}
            <ComponentShowcase
                title="With Label"
                description="Input with a label above it."
                code={`<Input label="Email" placeholder="you@example.com" />`}
            >
                <Input label="Email" placeholder="you@example.com" className="w-[300px]" />
            </ComponentShowcase>

            {/* With Helper Text */}
            <ComponentShowcase
                title="With Helper Text"
                description="Input with helper text below."
                code={`<Input 
  label="Password" 
  type="password" 
  helperText="Must be at least 8 characters" 
/>`}
            >
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    helperText="Must be at least 8 characters"
                    className="w-[300px]"
                />
            </ComponentShowcase>

            {/* Error State */}
            <ComponentShowcase
                title="Error State"
                description="Input with error message."
                code={`<Input 
  label="Email" 
  error="Please enter a valid email address" 
  defaultValue="invalid-email"
/>`}
            >
                <Input
                    label="Email"
                    error="Please enter a valid email address"
                    defaultValue="invalid-email"
                    className="w-[300px]"
                />
            </ComponentShowcase>

            {/* Disabled */}
            <ComponentShowcase
                title="Disabled"
                description="Disabled input state."
                code={`<Input disabled placeholder="Disabled input" />`}
            >
                <Input disabled placeholder="Disabled input" className="w-[300px]" />
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
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">label</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Label text above input</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">error</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Error message (shows red styling)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">helperText</td>
                                <td className="px-4 py-3 text-muted-foreground">string</td>
                                <td className="px-4 py-3 text-muted-foreground">Helper text below input</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
