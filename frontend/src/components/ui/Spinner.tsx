import React from "react"

interface SpinnerProps {
    size?: "sm" | "md" | "lg"
    color?: string
    className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
                                                    size = "md",
                                                    color = "border-blue-500",
                                                    className = "",
                                                }) => {
    const sizes = {
        sm: "w-2 h-2 border-1",
        md: "w-4 h-4 border-2",
        lg: "w-8 h-8 border-4",
    }

    return (
        <div
            className={`
        ${sizes[size]} 
        ${color} 
        border-t-transparent border-solid rounded-full animate-spin
        ${className}
      `}
        />
    )
}
