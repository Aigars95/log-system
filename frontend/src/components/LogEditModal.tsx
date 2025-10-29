import { Button } from "./ui/Button"



interface LogEditModalProps {
    open: boolean
    onClose: () => void
    onSave: (data: { owner: string; text: string }) => void
    owner: string
    text: string
    loading?: boolean
}

export const LogEditModal = ({
                                 open,
                                 onClose,
                                 onSave,
                                 owner,
                                 text,
                                 loading,
                             }: LogEditModalProps) => {
    if (!open) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const owner = (form.elements.namedItem("owner") as HTMLInputElement).value
        const text = (form.elements.namedItem("text") as HTMLTextAreaElement).value
        onSave({ owner, text })
    }

    return (
        <div className="modal-overlay">
            <div className="card max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Edit Log Entry
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Owner
                        </label>
                        <input
                            name="owner"
                            defaultValue={owner}
                            className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text
                        </label>
                        <textarea
                            name="text"
                            defaultValue={text}
                            rows={4}
                            className="w-full border rounded-md px-2 py-1 resize-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <Button variant="outline" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit" loading={loading}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
