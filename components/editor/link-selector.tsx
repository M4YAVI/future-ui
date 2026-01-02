"use client";

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
