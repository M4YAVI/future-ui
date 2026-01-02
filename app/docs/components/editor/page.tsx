"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Editor } from "@/components/ui/editor";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const codeExample = `import { Editor } from "@/components/ui/editor";

function MyPage() {
  const [content, setContent] = useState("");

  return (
    <Editor
      defaultValue=""
      onChange={setContent}
      placeholder="Type '/' for commands..."
    />
  );
}`;

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Editor</h1>
        <p className="text-lg text-muted-foreground">
          A Notion-style editor with slash commands, task lists, and full markdown support.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="font-medium text-zinc-200">Slash Commands</div>
          <div className="text-zinc-500">Type / for menu</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="font-medium text-zinc-200">Task Lists</div>
          <div className="text-zinc-500">Checkable todos</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="font-medium text-zinc-200">Rich Text</div>
          <div className="text-zinc-500">Headings, lists, quotes</div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="font-medium text-zinc-200">Images</div>
          <div className="text-zinc-500">URL-based images</div>
        </div>
      </div>

      {/* Interactive Demo */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Try it out</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Type '/' to open the command menu. Use arrow keys to navigate and Enter to select.
          </p>
        </div>

        {/* Custom Preview Container */}
        <div className="rounded-lg border border-border overflow-hidden">
          {/* Tabs Header */}
          <div className="flex items-center border-b border-border bg-zinc-950">
            <button
              onClick={() => setActiveTab("preview")}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === "preview"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Preview
              {activeTab === "preview" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === "code"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Code
              {activeTab === "code" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </button>
          </div>

          {/* Content Panels */}
          <div className="relative">
            {/* Preview Panel - FULL WIDTH, no flex centering */}
            <div className={`${activeTab === "preview" ? "block" : "hidden"} bg-black p-4`}>
              <Editor />
            </div>

            {/* Code Panel */}
            <div className={activeTab === "code" ? "block" : "hidden"}>
              <CodeBlock code={codeExample} language="tsx" />
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            1. Install the required dependencies:
          </p>
          <CodeBlock
            code="bun add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-task-list @tiptap/extension-task-item @tiptap/extension-image @tiptap/suggestion cmdk lucide-react tippy.js"
            language="bash"
          />
          <p className="text-muted-foreground">
            2. Copy the editor files from <code className="text-zinc-400">components/ui/editor.tsx</code> and <code className="text-zinc-400">components/ui/slash-command.tsx</code>.
          </p>
          <p className="text-muted-foreground">
            3. Add the Tiptap styles from <code className="text-zinc-400">globals.css</code> (search for <code className="text-zinc-400">.tiptap</code>).
          </p>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API</h2>
        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900">
              <tr>
                <th className="text-left p-3 font-medium text-zinc-300">Prop</th>
                <th className="text-left p-3 font-medium text-zinc-300">Type</th>
                <th className="text-left p-3 font-medium text-zinc-300">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="p-3 text-zinc-200">defaultValue</td>
                <td className="p-3 text-zinc-400">string</td>
                <td className="p-3 text-zinc-500">""</td>
              </tr>
              <tr>
                <td className="p-3 text-zinc-200">onChange</td>
                <td className="p-3 text-zinc-400">(html: string) =&gt; void</td>
                <td className="p-3 text-zinc-500">-</td>
              </tr>
              <tr>
                <td className="p-3 text-zinc-200">placeholder</td>
                <td className="p-3 text-zinc-400">string</td>
                <td className="p-3 text-zinc-500">"Type '/' for commands..."</td>
              </tr>
              <tr>
                <td className="p-3 text-zinc-200">className</td>
                <td className="p-3 text-zinc-400">string</td>
                <td className="p-3 text-zinc-500">""</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
