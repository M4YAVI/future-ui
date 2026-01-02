"use client";

import {
    createContext,
    useContext,
    useState,
    type HTMLAttributes,
    type ReactNode,
} from "react";

// Context for Tabs state
interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs provider");
    }
    return context;
}

// Tabs Root
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
}

export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange,
    className = "",
    children,
    ...props
}: TabsProps) {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const value = controlledValue ?? uncontrolledValue;
    const handleValueChange = (newValue: string) => {
        setUncontrolledValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div className={`w-full ${className}`} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// Tabs List
interface TabsListProps extends HTMLAttributes<HTMLDivElement> { }

export function TabsList({ className = "", children, ...props }: TabsListProps) {
    return (
        <div
            role="tablist"
            className={`
        inline-flex h-10 items-center justify-center rounded-md 
        bg-muted p-1 text-muted-foreground
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
}

// Tabs Trigger
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    value: string;
    disabled?: boolean;
}

export function TabsTrigger({
    value,
    disabled = false,
    className = "",
    children,
    ...props
}: TabsTriggerProps) {
    const { value: selectedValue, onValueChange } = useTabsContext();
    const isSelected = selectedValue === value;

    return (
        <button
            role="tab"
            type="button"
            aria-selected={isSelected}
            disabled={disabled}
            onClick={() => onValueChange(value)}
            className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-sm 
        px-3 py-1.5 text-sm font-medium transition-all
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${isSelected
                    ? "bg-background text-foreground shadow-sm"
                    : "hover:bg-background/50 hover:text-foreground"
                }
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}

// Tabs Content
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
}

export function TabsContent({
    value,
    className = "",
    children,
    ...props
}: TabsContentProps) {
    const { value: selectedValue } = useTabsContext();
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
        <div
            role="tabpanel"
            className={`
        mt-2 ring-offset-background
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        animate-fade-in
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
}
