"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";

type AlertVariant = "default" | "info" | "success" | "warning" | "error";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    title?: string;
    dismissible?: boolean;
    onDismiss?: () => void;
}

const variantStyles: Record<AlertVariant, string> = {
    default: "border-border bg-muted/50 text-foreground",
    info: "border-info/30 bg-info/10 text-info",
    success: "border-success/30 bg-success/10 text-success",
    warning: "border-warning/30 bg-warning/10 text-warning",
    error: "border-error/30 bg-error/10 text-error",
};

const iconMap: Record<AlertVariant, React.ReactNode> = {
    default: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    success: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    error: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            className = "",
            variant = "default",
            title,
            dismissible = false,
            onDismiss,
            children,
            ...props
        },
        ref
    ) => {
        const [dismissed, setDismissed] = useState(false);

        if (dismissed) return null;

        const handleDismiss = () => {
            setDismissed(true);
            onDismiss?.();
        };

        return (
            <div
                ref={ref}
                role="alert"
                className={`
          relative flex gap-3 rounded-lg border p-4
          ${variantStyles[variant]}
          ${className}
        `}
                {...props}
            >
                {/* Icon */}
                <div className="shrink-0 mt-0.5">{iconMap[variant]}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {title && (
                        <h5 className="mb-1 font-medium leading-none tracking-tight">
                            {title}
                        </h5>
                    )}
                    <div className="text-sm opacity-90">{children}</div>
                </div>

                {/* Dismiss Button */}
                {dismissible && (
                    <button
                        onClick={handleDismiss}
                        className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
                        aria-label="Dismiss"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        );
    }
);

Alert.displayName = "Alert";
