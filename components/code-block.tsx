"use client";

import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    filename?: string;
}

export function CodeBlock({
    code,
    language = "tsx",
    showLineNumbers = false,
    filename,
}: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-[#09090b]">
            {filename && (
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2 text-xs font-mono text-zinc-400">
                    <span>{filename}</span>
                </div>
            )}

            <div className="relative">
                <button
                    onClick={copyToClipboard}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/80 text-zinc-400 opacity-0 backdrop-blur transition-all hover:bg-zinc-800 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                    title="Copy code"
                    type="button"
                >
                    {isCopied ? (
                        <svg
                            className="h-4 w-4 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                    )}
                </button>

                <Highlight
                    theme={themes.vsDark}
                    code={code.trim()}
                    language={language as Language}
                >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <div
                            className="max-h-[650px] overflow-auto p-4 text-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50"
                            style={{
                                ...style,
                                backgroundColor: "transparent", // Force transparent to use container bg
                            }}
                        >
                            <pre className={className} style={{ ...style, backgroundColor: 'transparent', float: 'left', minWidth: '100%' }}>
                                {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })} className="table-row">
                                        {showLineNumbers && (
                                            <span className="table-cell px-4 select-none text-right text-zinc-600/60 font-mono text-[11px] leading-relaxed">
                                                {i + 1}
                                            </span>
                                        )}
                                        <span className="table-cell">
                                            {line.map((token, key) => (
                                                <span key={key} {...getTokenProps({ token })} />
                                            ))}
                                        </span>
                                    </div>
                                ))}
                            </pre>
                        </div>
                    )}
                </Highlight>
            </div>
        </div>
    );
}
