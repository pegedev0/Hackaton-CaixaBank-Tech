import { useMemo, useState } from "react"

export function usePaginateTransactions ({ filteredAndSortedTransactions }) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginatedTransactions = useMemo(() => {
        const startIndex = page * rowsPerPage
        const endIndex = startIndex + rowsPerPage
        return filteredAndSortedTransactions.slice(startIndex, endIndex)
    }, [filteredAndSortedTransactions, page, rowsPerPage])

    return { paginatedTransactions, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }
}