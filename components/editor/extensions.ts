import { InputRule } from "@tiptap/core";
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
                return `Heading ${node.attrs.level}`;
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
            class: "flex gap-2",
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
