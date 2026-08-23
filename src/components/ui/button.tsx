import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/40 disabled:pointer-events-none disabled:opacity-40 min-h-11 px-5 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-copper-deep",
        copper: "bg-copper text-paper hover:bg-copper-deep",
        outline: "border border-line bg-surface text-ink hover:bg-paper",
        ghost: "text-ink hover:bg-paper",
      },
      size: {
        default: "h-11",
        sm: "h-10 px-4 text-xs",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";
