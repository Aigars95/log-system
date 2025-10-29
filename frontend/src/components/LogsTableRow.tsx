import type { LogType } from "../types/logType"
import { Button } from "./ui/Button"
import { Tooltip } from "./ui/Tooltip"
import {formatDate} from "../utils/formatDate.ts";
import {useEffect, useRef, useState} from "react";


interface LogsTableRowProps {
    log: LogType
    onEdit: (log: LogType) => void
    onDelete: (id: number) => void
    isLoading: boolean
}

export const LogsTableRow = ({
                                 log,
                                 onEdit,
                                 onDelete,
                                 isLoading,
                             }: LogsTableRowProps) => {
    const textRef = useRef<HTMLDivElement | null>(null)
    const [isTruncated, setIsTruncated] = useState(false)

    const checkTruncation = () => {
        const el = textRef.current
        if (!el) return

        const tolerance = 2
        const truncated =
            el.scrollHeight - el.clientHeight > tolerance ||
            el.scrollWidth - el.clientWidth > tolerance

        setIsTruncated(truncated)
    }

    useEffect(() => {
        const el = textRef.current
        if (!el) return

        checkTruncation()

        const resizeObserver = new ResizeObserver(() => checkTruncation())
        resizeObserver.observe(el)

        window.addEventListener("resize", checkTruncation)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", checkTruncation)
        }
    }, [log.text])

    return (
        <tr className="border-b last:border-0 hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-medium text-gray-900 w-[20%] truncate">
                {log.owner || "—"}
            </td>

            <td className="px-4 py-3 text-gray-800 text-sm w-[40%] max-w-[400px]">
                {isTruncated ? (
                    <Tooltip text={log.text}>
                        <div
                            ref={textRef}
                            className="line-clamp-2 whitespace-pre-wrap break-words cursor-help"
                        >
                            {log.text}
                        </div>
                    </Tooltip>
                ) : (
                    <div
                        ref={textRef}
                        className="line-clamp-2 whitespace-pre-wrap break-words"
                    >
                        {log.text || "—"}
                    </div>
                )}
            </td>

            <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap w-[15%]">
                {formatDate(log.createdAt)}
            </td>

            <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap w-[15%]">
                {formatDate(log.updatedAt)}
            </td>

            <td className="px-4 py-3 text-center w-[10%]">
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onEdit(log)}
                        className="px-3 py-1.5 text-sm"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => onDelete(log.id)}
                        variant="danger"
                        loading={isLoading}
                        className="px-3 py-1.5 text-sm"
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    )
}
