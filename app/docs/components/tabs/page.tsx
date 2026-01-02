import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TabsPage() {
    return (
        <div className="space-y-10 animate-fade-up">
            {/* Page Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Tabs</h1>
                <p className="text-lg text-muted-foreground">
                    A set of layered sections of content, displayed one at a time.
                </p>
            </div>

            {/* Preview */}
            <ComponentShowcase
                title="Default"
                description="A basic tabs component."
                code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Account settings content here.
  </TabsContent>
  <TabsContent value="password">
    Password settings content here.
  </TabsContent>
</Tabs>`}
            >
                <div className="w-full max-w-md">
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">
                                    Make changes to your account here. Click save when you&apos;re done.
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">
                                    Change your password here. After saving, you&apos;ll be logged out.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </ComponentShowcase>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Installation</h2>
                <p className="text-muted-foreground">
                    Copy the following code into <code>components/ui/tabs.tsx</code>:
                </p>
                <CodeBlock
                    code={`"use client";

import { createContext, useContext, useState, type HTMLAttributes } from "react";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used within Tabs");
  return context;
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({ defaultValue, value, onValueChange, children, ...props }: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  
  return (
    <TabsContext.Provider value={{ 
      value: currentValue, 
      onValueChange: (v) => { setUncontrolledValue(v); onValueChange?.(v); } 
    }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={\`inline-flex h-10 items-center rounded-md bg-muted p-1 \${className}\`} {...props}>
      {children}
    </div>
  );
}

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export function TabsTrigger({ value, disabled, children, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabsContext();
  const isSelected = selectedValue === value;
  
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={\`px-3 py-1.5 text-sm font-medium rounded-sm transition-all
        \${isSelected ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}\`}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({ value, children, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();
  if (selectedValue !== value) return null;
  return <div {...props}>{children}</div>;
}`}
                    language="tsx"
                    filename="tabs.tsx"
                    showLineNumbers
                />
            </section>

            {/* Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                <CodeBlock
                    code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  );
}`}
                    language="tsx"
                />
            </section>

            {/* Multiple Tabs */}
            <ComponentShowcase
                title="With More Tabs"
                description="Tabs work with any number of items."
                code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  ...
</Tabs>`}
            >
                <div className="w-full max-w-lg">
                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">Overview content</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">Analytics content</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="reports">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">Reports content</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="settings">
                            <div className="rounded-lg border border-border p-4 mt-2">
                                <p className="text-sm text-muted-foreground">Settings content</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </ComponentShowcase>

            {/* Props Table */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Components</h2>
                <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                        <thead className="border-b border-border bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Component</th>
                                <th className="px-4 py-3 text-left font-medium">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">Tabs</td>
                                <td className="px-4 py-3 text-muted-foreground">Root component with state management</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">TabsList</td>
                                <td className="px-4 py-3 text-muted-foreground">Container for tab triggers</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">TabsTrigger</td>
                                <td className="px-4 py-3 text-muted-foreground">Button to switch tabs</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono text-xs">TabsContent</td>
                                <td className="px-4 py-3 text-muted-foreground">Content panel for each tab</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
