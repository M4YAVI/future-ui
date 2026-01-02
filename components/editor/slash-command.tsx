"use client";

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
// import { useCompletion } from "@ai-sdk/react";
import tippy from "tippy.js";
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    MessageSquarePlus,
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

    /*
        const { complete, isLoading } = useCompletion({
            id: "tiptap_completion",
            api: "/api/generate",
            onResponse: (response: Response) => {
                if (response.status === 429) {
                    return;
                }
                if (response.body) {
                    editor.chain().focus().deleteRange(range).run();
                }
            },
            onFinish: (_prompt: string, completion: string) => {
                // highlight the generated text
                editor.commands.setTextSelection({
                    from: range.from,
                    to: range.from + completion.length,
                });
            },
            onError: (e: Error) => {
                console.error(e.message);
            },
        });
    */

    const selectItem = useCallback(
        (index: number) => {
            const item = items[index];
            if (item) {
                if (item.title === "Continue writing") {
                    // completion logic if needed
                } else {
                    command(item);
                }
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
                        className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground ${index === selectedIndex ? "bg-accent text-accent-foreground" : ""
                            }`}
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
