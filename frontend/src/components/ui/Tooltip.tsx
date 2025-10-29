import type { ReactNode } from "react"
import  { useState } from "react"

interface TooltipProps {
    text: string
    children: ReactNode
}

export const Tooltip = ({ text, children }: TooltipProps) => {
    const [visible, setVisible] = useState(false)

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}

            {visible && (
                <div
                    className="absolute z-50 px-2 py-1 mt-1 text-xs text-white bg-gray-900 rounded
                    shadow-lg whitespace-pre-wrap max-w-xs w-max left-1/2 -translate-x-1/2 animate-fade-in"
                >
                    {text}
                </div>
            )}
        </div>
    )
}

