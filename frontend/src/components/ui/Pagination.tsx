import { Button } from "./Button"

interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export const Pagination = ({
                               totalPages,
                               currentPage,
                               onPageChange,
                           }: PaginationProps) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
            <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ←
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant={currentPage === i + 1 ? "primary" : "outline"}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}

            <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                →
            </Button>
        </div>
    )
}
