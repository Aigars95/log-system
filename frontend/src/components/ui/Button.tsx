import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "danger" | "outline"
    loading?: boolean
}

import { Spinner } from "./Spinner.tsx"

export const Button = ({
                           children,
                           variant = "primary",
                           loading,
                           disabled,
                           className = "",
                           ...props
                       }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`btn btn-${variant} ${
                disabled || loading ? "opacity-70 cursor-not-allowed" : ""
            } ${className}`}
        >
            {loading && <Spinner size="sm" color="border-white" />}
            {children}
        </button>
    )
}
