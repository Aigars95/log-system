import { Button } from "./Button"

interface ModalProps {
    open: boolean
    title: string
    onCancel: () => void
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
    confirmLoading?: boolean
    children?: React.ReactNode
}

export const Modal = ({
                          open,
                          title,
                          onCancel,
                          onConfirm,
                          confirmText = "Confirm",
                          cancelText = "Cancel",
                          confirmLoading = false,
                          children,
                      }: ModalProps) => {
    if (!open) return null

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="card max-w-lg w-full">
                {/* Заголовок */}
                <p className="text-lg font-medium mb-4 text-gray-800">{title}</p>

                {/* Динамический контент */}
                {children && <div className="mb-4">{children}</div>}

                {/* Кнопки управления */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        loading={confirmLoading}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
