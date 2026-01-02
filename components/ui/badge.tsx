import { type HTMLAttributes, forwardRef } from "react";

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "error" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-foreground text-background",
    secondary: "bg-muted text-muted-foreground",
    success: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    error: "bg-error/20 text-error border-error/30",
    outline: "bg-transparent border-border text-foreground",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className = "", variant = "default", ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={`
          inline-flex items-center rounded-full border px-2.5 py-0.5 
          text-xs font-semibold transition-colors
          ${variantStyles[variant]}
          ${className}
        `}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";
