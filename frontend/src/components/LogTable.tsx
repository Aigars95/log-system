import { useEffect, useState } from "react"
import { getLogs, updateLog, deleteLog, createLog } from "../api/logs"
import type { LogType } from "../types/logType"
import { Spinner } from "./ui/Spinner"
import { Button } from "./ui/Button"
import { Modal } from "./ui/Modal"
import { Pagination } from "./ui/Pagination"
import { LogsTableRow } from "./LogsTableRow"
import { LogEditModal } from "./LogEditModal"
import { Alert } from "./ui/Alert"
import { LogCard } from "./LogCard"

export default function LogsTable() {
    const [logs, setLogs] = useState<LogType[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null)
    const [showConfirm, setShowConfirm] = useState<number | null>(null)
    const [editLog, setEditLog] = useState<LogType | null>(null)
    const [saving, setSaving] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const logsPerPage = 10

    useEffect(() => {
        fetchLogs()
    }, [])

    const fetchLogs = () => {
        setLoading(true)
        getLogs()
            .then((data) => {
                const sorted = [...data].sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                setLogs(sorted)
            })
            .finally(() => setLoading(false))
    }

    const handleCreate = () => {
        setActionLoadingId(-1)
        createLog("New Owner", "New log text")
            .then((newLog) =>
                setLogs((prev) =>
                    [...prev, newLog].sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                )
            )
            .finally(() => setActionLoadingId(null))
    }

    const handleDelete = (id: number) => {
        setActionLoadingId(id)
        deleteLog(id)
            .then(() => {
                setLogs((prev) => {
                    const updated = prev.filter((l) => l.id !== id)
                    const totalAfterDelete = Math.ceil(updated.length / logsPerPage)
                    if (currentPage > totalAfterDelete) {
                        setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    return updated
                })
            })
            .finally(() => {
                setActionLoadingId(null)
                setShowConfirm(null)
            })
    }

    const handleSave = (data: { owner: string; text: string }) => {
        if (!editLog) return
        setSaving(true)
        updateLog(editLog.id, data)
            .then(() => fetchLogs())
            .finally(() => {
                setSaving(false)
                setEditLog(null)
            })
    }

    const indexOfLastLog = currentPage * logsPerPage
    const currentLogs = logs.slice(indexOfLastLog - logsPerPage, indexOfLastLog)
    const totalPages = Math.ceil(logs.length / logsPerPage)

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Logs</h2>
                <Button
                    onClick={handleCreate}
                    loading={actionLoadingId === -1}
                    disabled={actionLoadingId === -1}
                >
                    + New Log
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : logs.length === 0 ? (
                <Alert text="No logs found. Create one to get started." />
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-visible border border-gray-100 rounded-xl shadow-sm bg-white">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 font-semibold w-[20%]">Owner</th>
                                <th className="px-4 py-3 font-semibold w-[40%]">Text</th>
                                <th className="px-4 py-3 font-semibold w-[15%]">Created</th>
                                <th className="px-4 py-3 font-semibold w-[15%]">Updated</th>
                                <th className="px-4 py-3 text-center font-semibold w-[10%]">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentLogs.map((log) => (
                                <LogsTableRow
                                    key={log.id}
                                    log={log}
                                    onEdit={setEditLog}
                                    onDelete={(id) => setShowConfirm(id)} // ✅ открывает модалку
                                    isLoading={actionLoadingId === log.id}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid md:hidden gap-4">
                        {currentLogs.map((log) => (
                            <LogCard
                                key={log.id}
                                log={log}
                                onEdit={setEditLog}
                                onDelete={(id) => setShowConfirm(id)}
                                isLoading={actionLoadingId === log.id}
                            />
                        ))}
                    </div>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}

            <Modal
                open={!!showConfirm}
                title="Are you sure you want to delete this log?"
                onCancel={() => setShowConfirm(null)}
                onConfirm={() => handleDelete(showConfirm!)}
                confirmText="Delete"
                cancelText="Cancel"
                confirmLoading={actionLoadingId === showConfirm}
            />

            {editLog && (
                <LogEditModal
                    open={!!editLog}
                    onClose={() => setEditLog(null)}
                    onSave={handleSave}
                    owner={editLog.owner}
                    text={editLog.text}
                    loading={saving}
                />
            )}
        </div>
    )
}
