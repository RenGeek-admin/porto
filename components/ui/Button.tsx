"use client";

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: "bg-[#FFD100] text-black hover:bg-[#FFE04D]",
            secondary: "bg-[#FF90E8] text-black hover:bg-[#FFA5ED]",
            accent: "bg-[#00C2FF] text-black hover:bg-[#33CEFF]",
            outline: "bg-white text-black hover:bg-gray-100",
        }

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg font-bold",
        }

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center border-4 border-black transition-all",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
