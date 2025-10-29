import { Info } from "lucide-react"

interface AlertProps {
    text: string
}

export const Alert = ({ text }: AlertProps) => {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-700 font-medium">{text}</p>
        </div>
    )
}
