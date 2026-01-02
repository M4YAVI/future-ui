import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-foreground"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`
            flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm
            placeholder:text-muted-foreground
            transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
            disabled:cursor-not-allowed disabled:opacity-50
            ${error
                            ? "border-error focus-visible:ring-error"
                            : "border-border focus-visible:border-foreground/50"
                        }
            ${className}
          `}
                    {...props}
                />
                {(error || helperText) && (
                    <p
                        className={`text-xs ${error ? "text-error" : "text-muted-foreground"
                            }`}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
