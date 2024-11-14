import { useStore } from "@nanostores/react"
import { transactionsStore } from "../stores/transactionStore"
import { useMemo, useState } from "react"

export function useFilterTransactions () {
    const transactions = useStore(transactionsStore)

    const [filterCategory, setFilterCategory] = useState('')
    const [filterType, setFilterType] = useState('')
    const [sortField, setSortField] = useState('')

    const filteredAndSortedTransactions = useMemo(() => {
        let filteredTransactions = [...transactions]

        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

        if (filterCategory) {
            filteredTransactions = filteredTransactions.filter((transaction) => transaction.category === filterCategory)
        }
    
        if (filterType) {
            filteredTransactions = filteredTransactions.filter((transaction) => transaction.type.toLowerCase() === filterType.toLowerCase())
        }
    
        if (sortField) {
            filteredTransactions = [...filteredTransactions].sort((a, b) => {
                if (sortField === 'amount') return b.amount - a.amount
                if (sortField === 'date') return new Date(b.date) - new Date(a.date)
                return 0
            })
        }
    
        return filteredTransactions
    }, [transactions, filterCategory, filterType, sortField])

    return { filteredAndSortedTransactions, filterCategory, setFilterCategory, filterType, setFilterType, sortField, setSortField }
}