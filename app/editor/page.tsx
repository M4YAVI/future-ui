import { TiptapEditor } from "@/components/editor/tiptap-editor";

export default function EditorPage() {
    return (
        <div className="min-h-screen bg-muted/20 p-8 flex items-center justify-center">
            <div className="w-full max-w-4xl space-y-4">
                <h1 className="text-2xl font-bold">Notion-like Editor</h1>
                <p className="text-muted-foreground">
                    A rich text editor with slash commands, bubble menu, and more.
                    Type <code className="bg-muted px-1 rounded">/</code> to see commands.
                </p>
                <TiptapEditor
                    initialContent={{
                        type: "doc",
                        content: [
                            {
                                type: "heading",
                                attrs: { level: 1 },
                                content: [{ type: "text", text: "Hello World" }],
                            },
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        text: "This is a Notion-style editor built with Tiptap. Try selecting this text to see the bubble menu, or type '/' to open the command menu.",
                                    },
                                ],
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
}
