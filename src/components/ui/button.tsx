import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        destructive: "bg-error text-white hover:bg-error/90 shadow-md hover:shadow-lg",
        outline: "border-2 border-border-primary bg-surface-primary hover:bg-surface-secondary text-content-primary hover:border-brand-primary",
        secondary: "bg-surface-secondary text-content-primary hover:bg-surface-elevated shadow-sm hover:shadow-md",
        ghost: "text-content-secondary hover:bg-surface-secondary hover:text-content-primary",
        link: "text-brand-primary underline-offset-4 hover:underline hover:text-brand-secondary",
        gradient: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-xl transform hover:-translate-y-1 shadow-lg",
        minimal: "bg-surface-elevated text-content-primary hover:bg-surface-overlay border border-border-primary hover:border-brand-primary",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
