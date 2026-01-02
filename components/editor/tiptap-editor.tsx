import { EditorContent, useEditor } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import { slashCommand } from "./slash-command";
import { EditorBubbleMenu } from "./editor-bubble-menu";

interface TiptapEditorProps {
    initialContent?: any;
    onChange?: (content: any) => void;
}

export const TiptapEditor = ({ initialContent, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [...defaultExtensions, slashCommand],
        content: initialContent,
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            onChange?.(json);
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-stone dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-4",
            },
            handleDOMEvents: {
                keydown: (_view, event) => {
                    // prevent default event listeners from handling Enter sometimes
                    if (event.key === "Enter" && event.metaKey) {
                        // maybe submit form?
                    }
                    return false;
                },
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="relative w-full rounded-lg border border-muted bg-background shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex w-full items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                    <EditorBubbleMenu editor={editor} />
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
};
