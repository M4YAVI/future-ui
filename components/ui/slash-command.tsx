"use client";

import React, { useCallback, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Extension, Range } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import {
    Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare,
    Code, Quote, Image as ImageIcon, Minus, Text
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface CommandItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    command: (props: { editor: any; range: Range }) => void;
}

interface CommandMenuProps {
    items: CommandItem[];
    command: (item: CommandItem) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Items Configuration
// ─────────────────────────────────────────────────────────────────────────────

const getSuggestionItems = ({ query }: { query: string }): CommandItem[] => {
    const items: CommandItem[] = [
        {
            title: "Text",
            description: "Just start writing with plain text.",
            icon: <Text className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
            },
        },
        {
            title: "Heading 1",
            description: "Big section heading.",
            icon: <Heading1 className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
            },
        },
        {
            title: "Heading 2",
            description: "Medium section heading.",
            icon: <Heading2 className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
            },
        },
        {
            title: "Heading 3",
            description: "Small section heading.",
            icon: <Heading3 className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
            },
        },
        {
            title: "Bullet List",
            description: "Create a simple bullet list.",
            icon: <List className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
        {
            title: "Numbered List",
            description: "Create a numbered list.",
            icon: <ListOrdered className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            },
        },
        {
            title: "Task List",
            description: "Track tasks with a to-do list.",
            icon: <CheckSquare className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleTaskList().run();
            },
        },
        {
            title: "Quote",
            description: "Capture a quote.",
            icon: <Quote className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleBlockquote().run();
            },
        },
        {
            title: "Code Block",
            description: "Capture a code snippet.",
            icon: <Code className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
            },
        },
        {
            title: "Divider",
            description: "Visually divide content.",
            icon: <Minus className="w-4 h-4" />,
            command: ({ editor, range }) => {
                editor.chain().focus().deleteRange(range).setHorizontalRule().run();
            },
        },
        {
            title: "Image",
            description: "Insert an image from URL.",
            icon: <ImageIcon className="w-4 h-4" />,
            command: ({ editor, range }) => {
                const url = window.prompt("Enter image URL:");
                if (url) {
                    editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
                }
            },
        },
    ];

    if (!query) return items;

    return items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Command Menu Component
// ─────────────────────────────────────────────────────────────────────────────

const CommandMenu = forwardRef<any, CommandMenuProps>((props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
        (index: number) => {
            const item = props.items[index];
            if (item) {
                props.command(item);
            }
        },
        [props]
    );

    const upHandler = useCallback(() => {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    }, [props.items.length, selectedIndex]);

    const downHandler = useCallback(() => {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
    }, [props.items.length, selectedIndex]);

    const enterHandler = useCallback(() => {
        selectItem(selectedIndex);
    }, [selectItem, selectedIndex]);

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
        onKeyDown: ({ event }: { event: KeyboardEvent }) => {
            if (event.key === "ArrowUp") {
                upHandler();
                return true;
            }
            if (event.key === "ArrowDown") {
                downHandler();
                return true;
            }
            if (event.key === "Enter") {
                enterHandler();
                return true;
            }
            return false;
        },
    }));

    if (props.items.length === 0) {
        return (
            <div className="z-50 min-w-[280px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
                <div className="p-4 text-center text-sm text-zinc-500">No results found.</div>
            </div>
        );
    }

    return (
        <div className="z-50 min-w-[280px] max-h-[320px] overflow-y-auto overflow-x-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-1 shadow-2xl">
            {props.items.map((item, index) => (
                <button
                    key={item.title}
                    onClick={() => selectItem(index)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${index === selectedIndex
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                        }`}
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900">
                        {item.icon}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-medium">{item.title}</span>
                        <span className="truncate text-xs text-zinc-500">{item.description}</span>
                    </div>
                </button>
            ))}
        </div>
    );
});

CommandMenu.displayName = "CommandMenu";

// ─────────────────────────────────────────────────────────────────────────────
// Suggestion Renderer
// ─────────────────────────────────────────────────────────────────────────────

const renderItems = () => {
    let component: ReactRenderer<any> | null = null;
    let popup: TippyInstance | null = null;

    return {
        onStart: (props: { editor: any; clientRect?: () => DOMRect | null }) => {
            component = new ReactRenderer(CommandMenu, {
                props,
                editor: props.editor,
            });

            const clientRect = props.clientRect?.();
            if (!clientRect) return;

            popup = tippy(document.body, {
                getReferenceClientRect: () => clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                animation: "shift-away",
                maxWidth: "none",
            });
        },

        onUpdate: (props: { editor: any; clientRect?: () => DOMRect | null }) => {
            component?.updateProps(props);

            const clientRect = props.clientRect?.();
            if (!clientRect) return;

            popup?.setProps({
                getReferenceClientRect: () => clientRect,
            });
        },

        onKeyDown: (props: { event: KeyboardEvent }) => {
            if (props.event.key === "Escape") {
                popup?.hide();
                return true;
            }
            return (component?.ref as any)?.onKeyDown(props) ?? false;
        },

        onExit: () => {
            popup?.destroy();
            component?.destroy();
        },
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// Slash Command Extension
// ─────────────────────────────────────────────────────────────────────────────

export const SlashCommand = Extension.create({
    name: "slashCommand",

    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({ editor, range, props }: { editor: any; range: Range; props: CommandItem }) => {
                    props.command({ editor, range });
                },
            },
        };
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ];
    },
});

// ─────────────────────────────────────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────────────────────────────────────

export const slashCommandSuggestion = {
    items: getSuggestionItems,
    render: renderItems,
};
