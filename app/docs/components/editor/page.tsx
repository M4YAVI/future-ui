import { CodeBlock } from "@/components/code-block";
import { TiptapEditor } from "@/components/editor/tiptap-editor";

export default function EditorDocsPage() {
    return (
        <div className="space-y-8 animate-fade-up">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Editor</h1>
                <p className="text-lg text-muted-foreground">
                    A Notion-style WYSIWYG editor with slash commands, bubble menu, and more.
                </p>
            </div>

            {/* Interactive Demo */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Demo</h2>
                <div className="overflow-hidden rounded-xl border border-muted bg-background shadow-sm">
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
                                {
                                    type: "taskList",
                                    content: [
                                        {
                                            type: "taskItem",
                                            attrs: { checked: false },
                                            content: [{ type: "paragraph", content: [{ type: "text", text: "Try the slash command" }] }],
                                        },
                                        {
                                            type: "taskItem",
                                            attrs: { checked: true },
                                            content: [{ type: "paragraph", content: [{ type: "text", text: "Try the bubble menu" }] }],
                                        },
                                    ],
                                },
                            ],
                        }}
                    />
                </div>
            </div>

            <div className="space-y-6">
                {/* Installation */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Installation</h2>
                    <p className="text-muted-foreground">
                        Install the required dependencies:
                    </p>
                    <CodeBlock
                        code={`bun add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-horizontal-rule @tiptap/extension-link @tiptap/extension-image @tiptap/extension-placeholder @tiptap/extension-underline @tiptap/extension-color @tiptap/extension-task-item @tiptap/extension-task-list tiptap-markdown @tiptap/extension-highlight @tiptap/extension-code-block-lowlight lowlight lucide-react tippy.js`}
                        language="bash"
                        className="not-prose"
                    />
                </section>

                {/* Components Instructions */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Usage</h2>
                    <p className="text-muted-foreground">
                        Copy the following files into your `components/editor` directory.
                    </p>
                </section>

                {/* Extensions */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">1. extensions.ts</h3>
                    <p className="text-muted-foreground">
                        Configure Tiptap extensions.
                    </p>
                    <CodeBlock
                        code={`import { InputRule } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

// Create lowlight instance
const lowlight = createLowlight(common);

export const defaultExtensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: "list-disc list-outside leading-3 -mt-2",
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: "list-decimal list-outside leading-3 -mt-2",
            },
        },
        listItem: {
            HTMLAttributes: {
                class: "leading-normal -mb-2",
            },
        },
        blockquote: {
            HTMLAttributes: {
                class: "border-l-4 border-primary",
            },
        },
        codeBlock: false, // Usage of CodeBlockLowlight instead
        code: {
            HTMLAttributes: {
                class: "rounded-md bg-muted  px-1.5 py-1 font-mono font-medium",
                spellcheck: "false",
            },
        },
        horizontalRule: false,
        dropcursor: {
            color: "#DBEAFE",
            width: 4,
        },
        gapcursor: false,
    }),
    // patch to fix horizontal rule
    HorizontalRule.extend({
        addInputRules() {
            return [
                new InputRule({
                    find: /^(?:---|—-|___\s|\*\*\*\s)$/,
                    handler: ({ state, range }) => {
                        const attributes = {};

                        const { tr } = state;
                        const start = range.from;
                        let end = range.to;

                        tr.insert(start - 1, this.type.create(attributes)).delete(
                            tr.mapping.map(start),
                            tr.mapping.map(end)
                        );
                    },
                }),
            ];
        },
    }).configure({
        HTMLAttributes: {
            class: "mt-4 mb-6 border-t border-muted-foreground",
        },
    }),
    TiptapLink.configure({
        HTMLAttributes: {
            class:
                "text-primary underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
        },
    }),
    TiptapImage.configure({
        allowBase64: true,
        HTMLAttributes: {
            class: "rounded-lg border border-border",
        },
    }),
    Placeholder.configure({
        placeholder: ({ node }) => {
            if (node.type.name === "heading") {
                return \`Heading \${node.attrs.level}\`;
            }
            return "Press '/' for commands";
        },
        includeChildren: true,
    }),
    TiptapUnderline,
    Color,
    Highlight.configure({
        multicolor: true,
    }),
    TaskList.configure({
        HTMLAttributes: {
            class: "not-prose pl-2",
        },
    }),
    TaskItem.configure({
        nested: true,
        HTMLAttributes: {
            class: "flex flex-row items-start gap-2",
        },
    }),
    Markdown.configure({
        html: false,
        transformPastedText: true,
    }),
    CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
    }),
];
`}
                        language="typescript"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Slash Command */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">2. slash-command.tsx</h3>
                    <p className="text-muted-foreground">
                        Implements the slash command menu.
                    </p>
                    <CodeBlock
                        code={`"use client";

import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    useLayoutEffect,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Text,
    TextQuote,
    Image as ImageIcon,
    Code,
    CheckSquare,
} from "lucide-react";

interface CommandItemProps {
    title: string;
    description: string;
    icon: React.ElementType;
}

interface Command {
    title: string;
    description: string;
    icon: React.ElementType;
    command: ({ editor, range }: { editor: Editor; range: Range }) => void;
}

const CommandList = ({
    items,
    command,
    editor,
    range,
}: {
    items: Command[];
    command: any;
    editor: any;
    range: any;
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
        (index: number) => {
            const item = items[index];
            if (item) {
                command(item);
            }
        },
        [command, items]
    );

    useEffect(() => {
        const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];
        const onKeyDown = (e: KeyboardEvent) => {
            if (navigationKeys.includes(e.key)) {
                e.preventDefault();
                if (e.key === "ArrowUp") {
                    setSelectedIndex(
                        (selectedIndex + items.length - 1) % items.length
                    );
                    return true;
                }
                if (e.key === "ArrowDown") {
                    setSelectedIndex((selectedIndex + 1) % items.length);
                    return true;
                }
                if (e.key === "Enter") {
                    selectItem(selectedIndex);
                    return true;
                }
                return false;
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [items, selectedIndex, setSelectedIndex, selectItem]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [items]);

    const commandListContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = commandListContainer.current;

        const item = container?.children[selectedIndex] as HTMLElement;

        if (item && container) {
            const containerHeight = container.offsetHeight;
            const itemHeight = item.offsetHeight;

            const top = item.offsetTop;
            const bottom = top + itemHeight;

            if (top < container.scrollTop) {
                container.scrollTop -= container.scrollTop - top + 5;
            } else if (bottom > containerHeight + container.scrollTop) {
                container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
            }
        }
    }, [selectedIndex]);

    return (
        <div
            id="slash-command"
            ref={commandListContainer}
            className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all"
        >
            {items.map((item: Command, index: number) => {
                return (
                    <button
                        className={\`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground \${index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                            }\`}
                        key={index}
                        onClick={() => selectItem(index)}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                            {item.icon && <item.icon size={18} />}
                        </div>
                        <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

const renderItems = () => {
    let component: ReactRenderer | null = null;
    let popup: any | null = null;

    return {
        onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
            component = new ReactRenderer(CommandList, {
                props,
                editor: props.editor,
            });

            // @ts-ignore
            popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
            });
        },
        onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
            component?.updateProps(props);

            popup &&
                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                });
        },
        onKeyDown: (props: { event: KeyboardEvent }) => {
            if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
            }

            // @ts-ignore
            return component?.ref?.onKeyDown(props);
        },
        onExit: () => {
            popup?.[0].destroy();
            component?.destroy();
        },
    };
};

const SlashCommand = Extension.create({
    name: "slash-command",
    addOptions() {
        return {
            suggestion: {
                char: "/",
                command: ({
                    editor,
                    range,
                    props,
                }: {
                    editor: Editor;
                    range: Range;
                    props: any;
                }) => {
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

const getSuggestionItems = ({ query }: { query: string }) => {
    return [
        {
            title: "Text",
            description: "Just start typing with plain text.",
            searchTerms: ["p", "paragraph"],
            icon: Text,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .toggleNode("paragraph", "paragraph")
                    .run();
            },
        },
        {
            title: "Heading 1",
            description: "Big section heading.",
            searchTerms: ["title", "big", "large"],
            icon: Heading1,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 1 })
                    .run();
            },
        },
        {
            title: "Heading 2",
            description: "Medium section heading.",
            searchTerms: ["subtitle", "medium"],
            icon: Heading2,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 2 })
                    .run();
            },
        },
        {
            title: "Heading 3",
            description: "Small section heading.",
            searchTerms: ["subtitle", "small"],
            icon: Heading3,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("heading", { level: 3 })
                    .run();
            },
        },
        {
            title: "Bullet List",
            description: "Create a simple bullet list.",
            searchTerms: ["unordered", "point"],
            icon: List,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleBulletList().run();
            },
        },
        {
            title: "Numbered List",
            description: "Create a list with numbering.",
            searchTerms: ["ordered"],
            icon: ListOrdered,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            },
        },
        {
            title: "To-do List",
            description: "Track tasks with a to-do list.",
            searchTerms: ["todo", "task", "list", "check", "checkbox"],
            icon: CheckSquare,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleTaskList().run();
            },
        },
        {
            title: "Quote",
            description: "Capture a quote.",
            searchTerms: ["blockquote"],
            icon: TextQuote,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setNode("paragraph")
                    .toggleBlockquote()
                    .run();
            },
        },
        {
            title: "Code",
            description: "Capture a code snippet.",
            searchTerms: ["codeblock"],
            icon: Code,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
            },
        },
        {
            title: "Image",
            description: "Upload an image from your computer.",
            searchTerms: ["photo", "picture", "media"],
            icon: ImageIcon,
            command: ({ editor, range }: { editor: Editor; range: Range }) => {
                editor.chain().focus().deleteRange(range).run();
                // Upload logic
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = async () => {
                    if (input.files?.length) {
                        const file = input.files[0];
                        const src = URL.createObjectURL(file);
                        editor.chain().focus().setImage({ src }).run();
                    }
                };
                input.click();
            },
        },
    ].filter((item) => {
        if (typeof query === "string" && query.length > 0) {
            const search = query.toLowerCase();
            return (
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                (item.searchTerms &&
                    item.searchTerms.some((term: string) => term.includes(search)))
            );
        }
        return true;
    });
};

export const slashCommand = SlashCommand.configure({
    suggestion: {
        items: getSuggestionItems,
        render: renderItems,
    },
});
`}
                        language="tsx"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Bubble Menu */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">3. editor-bubble-menu.tsx</h3>
                    <p className="text-muted-foreground">
                        Floating menu for text formatting.
                    </p>
                    <CodeBlock
                        code={`"use client";

import { isNodeSelection } from "@tiptap/react";
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react/menus'
import { FC, useState } from "react";
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    CodeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { LinkSelector } from "./link-selector";
import { NodeSelector } from "./node-selector";

export interface BubbleMenuItem {
    name: string;
    isActive: () => boolean;
    command: () => void;
    icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children"> & { tippyOptions?: any };

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
    const items: BubbleMenuItem[] = [
        {
            name: "bold",
            isActive: () => props.editor?.isActive("bold") ?? false,
            command: () => props.editor?.chain().focus().toggleBold().run(),
            icon: BoldIcon,
        },
        {
            name: "italic",
            isActive: () => props.editor?.isActive("italic") ?? false,
            command: () => props.editor?.chain().focus().toggleItalic().run(),
            icon: ItalicIcon,
            },
        {
            name: "underline",
            isActive: () => props.editor?.isActive("underline") ?? false,
            command: () => props.editor?.chain().focus().toggleUnderline().run(),
            icon: UnderlineIcon,
        },
        {
            name: "strike",
            isActive: () => props.editor?.isActive("strike") ?? false,
            command: () => props.editor?.chain().focus().toggleStrike().run(),
            icon: StrikethroughIcon,
        },
        {
            name: "code",
            isActive: () => props.editor?.isActive("code") ?? false,
            command: () => props.editor?.chain().focus().toggleCode().run(),
            icon: CodeIcon,
        },
    ];

    const bubbleMenuProps: EditorBubbleMenuProps = {
        ...props,
        shouldShow: ({ editor }) => {
            // don't show if image is selected
            if (isNodeSelection(editor.state.selection)) {
                return false;
            }
            return editor.view.state.selection.content().size > 0;
        },
        tippyOptions: {
            moveTransition: "transform 0.15s ease-out",
            onHidden: () => {
                setIsNodeSelectorOpen(false);
                setIsColorSelectorOpen(false);
                setIsLinkSelectorOpen(false);
            },
        },
    };

    const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
    const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
    const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

    return (
        <BubbleMenu
            {...bubbleMenuProps}
            className="flex w-fit divide-x divide-muted rounded-md border border-muted bg-background shadow-xl"
        >
            <NodeSelector
                editor={props.editor!}
                isOpen={isNodeSelectorOpen}
                setIsOpen={() => {
                    setIsNodeSelectorOpen(!isNodeSelectorOpen);
                    setIsColorSelectorOpen(false);
                    setIsLinkSelectorOpen(false);
                }}
            />
            <LinkSelector
                editor={props.editor!}
                isOpen={isLinkSelectorOpen}
                setIsOpen={() => {
                    setIsLinkSelectorOpen(!isLinkSelectorOpen);
                    setIsColorSelectorOpen(false);
                    setIsNodeSelectorOpen(false);
                }}
            />
            <div className="flex">
                {items.map((item, index) => (
                    <button
                        key={index}
                        onClick={item.command}
                        className={cn(
                            "p-2 text-muted-foreground hover:bg-muted active:bg-muted",
                            item.isActive() && "text-foreground"
                        )}
                        type="button"
                    >
                        <item.icon className={cn("h-4 w-4", {
                            "text-blue-500": item.isActive(),
                        })} />
                    </button>
                ))}
            </div>
        </BubbleMenu>
    );
};
`}
                        language="tsx"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Node Selector */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">4. node-selector.tsx</h3>
                    <p className="text-muted-foreground">
                        Selector for changing block types (H1, H2, List, etc.).
                    </p>
                    <CodeBlock
                        code={`"use client";

import { Editor } from "@tiptap/core";
import {
    Check,
    ChevronDown,
    Heading1,
    Heading2,
    Heading3,
    TextQuote,
    ListOrdered,
    TextIcon,
    Code,
    CheckSquare,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { BubbleMenuItem } from "./editor-bubble-menu";

interface NodeSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const NodeSelector = ({ editor, isOpen, setIsOpen }: NodeSelectorProps) => {
    const items: BubbleMenuItem[] = [
        {
            name: "Text",
            icon: TextIcon,
            command: () =>
                editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
            isActive: () =>
                editor.isActive("paragraph") &&
                !editor.isActive("bulletList") &&
                !editor.isActive("orderedList"),
        },
        {
            name: "Heading 1",
            icon: Heading1,
            command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
            name: "Heading 2",
            icon: Heading2,
            command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
            name: "Heading 3",
            icon: Heading3,
            command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive("heading", { level: 3 }),
        },
        {
            name: "To-do List",
            icon: CheckSquare,
            command: () => editor.chain().focus().toggleTaskList().run(),
            isActive: () => editor.isActive("taskItem"),
        },
        {
            name: "Bullet List",
            icon: ListOrdered,
            command: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive("bulletList"),
        },
        {
            name: "Numbered List",
            icon: ListOrdered,
            command: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive("orderedList"),
        },
        {
            name: "Quote",
            icon: TextQuote,
            command: () =>
                editor
                    .chain()
                    .focus()
                    .toggleNode("paragraph", "paragraph")
                    .toggleBlockquote()
                    .run(),
            isActive: () => editor.isActive("blockquote"),
        },
        {
            name: "Code",
            icon: Code,
            command: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive("codeBlock"),
        },
    ];

    const activeItem = items.filter((item) => item.isActive()).pop() ?? {
        name: "Multiple",
    };

    return (
        <div className="relative h-full">
            <button
                className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span>{activeItem?.name}</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded-md border border-muted bg-background shadow-xl animate-in fade-in slide-in-from-top-1">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.command();
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-between px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                            type="button"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-sm border border-muted p-1">
                                    <item.icon className="h-3 w-3" />
                                </div>
                                <span>{item.name}</span>
                            </div>
                            {activeItem.name === item.name && <Check className="h-4 w-4" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
`}
                        language="tsx"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Link Selector */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">5. link-selector.tsx</h3>
                    <p className="text-muted-foreground">
                        Input for adding/editing links.
                    </p>
                    <CodeBlock
                        code={`"use client";

import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { Check, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface LinkSelectorProps {
    editor: Editor;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector = ({ editor, isOpen, setIsOpen }: LinkSelectorProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Submit on enter
    useEffect(() => {
        if (isOpen) {
            // slightly delay focus to ensure it's visible
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const submitLink = () => {
        if (!inputRef.current) return;
        const url = inputRef.current.value;
        if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        } else {
            editor.chain().focus().unsetLink().run();
        }
        setIsOpen(false);
    }

    return (
        <div className="relative flex h-full">
            <div className="absolute top-full z-[99999] mt-1 flex w-60 overflow-hidden rounded-md border border-muted bg-background p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Paste a link"
                    className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
                    defaultValue={editor.getAttributes("link").href || ""}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            submitLink();
                        }
                    }}
                />
                {editor.getAttributes("link").href ? (
                    <button
                        className="flex items-center rounded-sm p-1 text-destructive hover:bg-muted"
                        type="button"
                        onClick={() => {
                            editor.chain().focus().unsetLink().run();
                            setIsOpen(false);
                        }}
                    >
                        <Trash className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        className="flex items-center rounded-sm p-1 text-muted-foreground hover:bg-muted"
                        type="button"
                        onClick={submitLink}
                    >
                        <Check className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
};
`}
                        language="tsx"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Editor Component */}
                <section className="space-y-4">
                    <h3 className="text-lg font-semibold">6. tiptap-editor.tsx</h3>
                    <p className="text-muted-foreground">
                        The main editor component.
                    </p>
                    <CodeBlock
                        code={`"use client";

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
        immediatelyRender: false,
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
`}
                        language="tsx"
                        className="not-prose"
                        codeClassName="max-h-[400px]"
                    />
                </section>

                {/* Example Usage */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Example Usage</h2>
                    <CodeBlock
                        code={`import { TiptapEditor } from "@/components/editor/tiptap-editor";

export default function Page() {
    return (
        <div className="p-8">
            <TiptapEditor
                initialContent="<p>Hello World</p>"
                onChange={(content) => console.log(content)}
            />
        </div>
    );
}
`}
                        language="tsx"
                        className="not-prose"
                    />
                </section>

            </div>
        </div>
    );
}
