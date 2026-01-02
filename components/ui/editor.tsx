"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { SlashCommand, slashCommandSuggestion } from "./slash-command";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface EditorProps {
    /** Initial HTML content for the editor */
    defaultValue?: string;
    /** Callback fired on every content change, returns HTML string */
    onChange?: (html: string) => void;
    /** Placeholder text when editor is empty */
    placeholder?: string;
    /** Additional CSS classes for the root container */
    className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Editor Component
// ─────────────────────────────────────────────────────────────────────────────

export function Editor({
    defaultValue = "",
    onChange,
    placeholder = "Type '/' for commands...",
    className = "",
}: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            Placeholder.configure({
                placeholder,
                showOnlyWhenEditable: true,
                showOnlyCurrent: true,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
            SlashCommand.configure({
                suggestion: slashCommandSuggestion,
            }),
        ],
        content: defaultValue,
        editorProps: {
            attributes: {
                class: "tiptap",
            },
        },
        onUpdate: ({ editor: e }) => {
            onChange?.(e.getHTML());
        },
        immediatelyRender: false,
    });

    if (!editor) {
        return (
            <div className={`notion-editor-loading ${className}`}>
                <div className="w-full h-[600px] bg-zinc-950 rounded-lg border border-zinc-800 animate-pulse" />
            </div>
        );
    }

    return (
        <div className={`notion-editor ${className}`}>
            {/* Full-width Editor Container */}
            <div className="w-full min-h-[600px] bg-zinc-950 rounded-lg border border-zinc-800 shadow-xl overflow-hidden flex flex-col">

                {/* Header Bar */}
                <div className="shrink-0 flex items-center h-11 px-4 border-b border-zinc-800/60 bg-zinc-900/40">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-zinc-700/50 hover:bg-red-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-zinc-700/50 hover:bg-yellow-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-zinc-700/50 hover:bg-green-500 transition-colors cursor-pointer" />
                    </div>
                    <div className="ml-4 text-xs text-zinc-500 font-medium">Untitled</div>
                </div>

                {/* Scrollable Editor Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="w-full max-w-4xl mx-auto px-6 py-10 sm:px-10 md:px-16 lg:px-20">
                        <EditorContent editor={editor} className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
