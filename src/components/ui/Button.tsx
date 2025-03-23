import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { inter } from "@/app/ui/fonts"
import { palette } from "@/lib/palette"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${inter.className} relative`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md",
        link: "text-primary underline-offset-4 hover:underline rounded-md",
        nav: "text-neutral-100 hover:text-neutral-300 [&.active-nav]:after:content-[''] [&.active-nav]:after:absolute [&.active-nav]:after:bottom-0 [&.active-nav]:after:left-0 [&.active-nav]:after:w-full [&.active-nav]:after:h-[1px] [&.active-nav]:after:bg-neutral-100",
        shadow:  `w-[120px] font-medium h-12 px-6 border border-neutral-200 text-neutral-600 bg-neutral-50 [box-shadow:6px_6px_1px_var(--shadow-color)] active:translate-x-[4px] active:translate-y-[4px] active:[box-shadow:0px_0px_var(--shadow-color)]`,
        loading: "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md cursor-wait"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 px-8",
        xlg: "w-80",
        icon: "h-9 w-9",
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
  asChild?: boolean,
  darkBackground?: boolean,
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isLoading=false, children, size, darkBackground = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={
          variant === 'shadow' 
            ? { 
                '--shadow-color': darkBackground 
                  ? palette.details["light-green"] 
                  : 'rgb(38 38 38)'
              } as React.CSSProperties
            : undefined
        }
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
