import type { LogType } from "../types/logType"
import { Button } from "./ui/Button"

interface LogCardProps {
    log: LogType
    onEdit: (log: LogType) => void
    onDelete: (id: number) => void
    isLoading: boolean
}

export function LogCard({ log, onEdit, onDelete, isLoading }: LogCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-4 relative">
            <div className="absolute top-4 right-4 text-[11px] text-gray-500 leading-tight text-right">
                <div>
                    <span className="font-medium text-gray-700">Created:</span>{" "}
                    {new Date(log.createdAt).toLocaleDateString()}
                </div>
                <div>
                    <span className="font-medium text-gray-700">Updated:</span>{" "}
                    {new Date(log.updatedAt).toLocaleDateString()}
                </div>
            </div>

            <div className="pr-28">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-1">
                    Owner
                </p>
                <p className="text-gray-900 font-semibold break-words text-base">
                    {log.owner || "—"}
                </p>
            </div>

            <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-1">
                    Text
                </p>
                <p className="text-gray-800 text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {log.text || "—"}
                </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                <Button variant="outline" onClick={() => onEdit(log)}>
                    Edit
                </Button>
                <Button
                    onClick={() => onDelete(log.id)}
                    variant="danger"
                    loading={isLoading}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}
