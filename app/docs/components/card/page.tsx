import Link from "next/link";
import { ComponentShowcase } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function CardPage() {
  return (
    <div className="space-y-10 animate-fade-up">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Card</h1>
        <p className="text-lg text-muted-foreground">
          A versatile container component for displaying content. Cards come in multiple variants for different use cases.
        </p>
      </div>

      {/* Card Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/components/card"
            className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-muted/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Basic Card</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Current</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Standard card with header, content, and footer sections.
            </p>
          </Link>
          <Link
            href="/docs/components/card/testimonial"
            className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-muted/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Testimonial Card</h3>
              <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Spotlight effect card for customer reviews with text highlighting.
            </p>
          </Link>
          <Link
            href="/docs/components/card/spotlight"
            className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-all hover:border-muted-foreground/30 hover:bg-muted/20"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Spotlight Card</h3>
              <svg className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Minimalist card with mouse-tracking spotlight gradient.
            </p>
          </Link>
        </div>
      </section>

      {/* Basic Card Preview with Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Card</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="rounded-lg border border-border p-8 bg-background flex items-center justify-center">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
              language="tsx"
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Copy the following code into <code>components/ui/card.tsx</code>:
        </p>
        <CodeBlock
          code={`import { type HTMLAttributes, forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`rounded-lg border border-border bg-card text-card-foreground shadow-sm \${className}\`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`flex flex-col space-y-1.5 p-6 \${className}\`} {...props} />
  )
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={\`text-lg font-semibold leading-none tracking-tight \${className}\`} {...props} />
  )
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={\`text-sm text-muted-foreground \${className}\`} {...props} />
  )
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`p-6 pt-0 \${className}\`} {...props} />
  )
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={\`flex items-center p-6 pt-0 \${className}\`} {...props} />
  )
);`}
          language="tsx"
          filename="card.tsx"
          showLineNumbers
        />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Simple Card with Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Simple Card</h2>
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <div className="rounded-lg border border-border p-8 bg-background flex items-center justify-center">
              <Card className="p-6 w-[350px]">
                <p className="text-sm text-muted-foreground">Simple card content without header or footer.</p>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock
              code={`<Card className="p-6">
  <p>Simple card content without header or footer.</p>
</Card>`}
              language="tsx"
            />
          </TabsContent>
        </Tabs>
      </section>

      {/* Components Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sub-Components</h2>
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
                <td className="px-4 py-3 font-mono text-xs">Card</td>
                <td className="px-4 py-3 text-muted-foreground">The main container</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardHeader</td>
                <td className="px-4 py-3 text-muted-foreground">Header section with spacing</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardTitle</td>
                <td className="px-4 py-3 text-muted-foreground">Title text styling</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardDescription</td>
                <td className="px-4 py-3 text-muted-foreground">Muted description text</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardContent</td>
                <td className="px-4 py-3 text-muted-foreground">Main content area</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CardFooter</td>
                <td className="px-4 py-3 text-muted-foreground">Footer with flex layout</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
