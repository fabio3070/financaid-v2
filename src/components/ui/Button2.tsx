import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { palette } from "@/lib/palette"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'shadow'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  ...props
}, ref) => {
  return (
    <button
      style={variant === 'shadow' ? { backgroundColor: palette.neutral[50] } : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-100 w-[120px]",
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'h-12 px-6 border border-neutral-200 text-neutral-600 [box-shadow:6px_6px_1px_rgb(38_38_38)] active:translate-x-[4px] active:translate-y-[4px] active:[box-shadow:0px_0px_rgb(38_38_38)]': variant === 'shadow',
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
