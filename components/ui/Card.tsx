import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, color = 'bg-white', ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all",
                "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                color,
                className
            )}
            {...props}
        />
    )
)
Card.displayName = "Card"

export { Card }
