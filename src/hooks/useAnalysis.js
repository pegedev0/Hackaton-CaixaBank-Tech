import { useStore } from "@nanostores/react"
import { useState } from "react"
import { transactionsStore } from "../stores/transactionStore"

export function useAnalysis () {
    const transactions = useStore(transactionsStore)

    const [timeFrame, setTimeFrame] = useState('monthly')
    const [reportType, setReportType] = useState('trend')

    const trendData = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date)
        let key
        
        switch (timeFrame) {
            case 'daily':
                key = date.toLocaleDateString()
                break
            case 'weekly':
                const week = date.toLocaleString('default', { week: 'numeric' })
                key = `Week ${week}, ${date.getFullYear()}`
                break
            case 'monthly':
                key = date.toLocaleString('default', { month: 'long', year: 'numeric' })
                break
            case 'yearly':
                key = date.getFullYear().toString()
                break
            default:
                break
        }

        if (!acc[key]) {
            acc[key] = { key, income: 0, expense: 0 }
        }

        if (transaction.type === 'Income') {
            acc[key].income += Number(transaction.amount)
        } else if (transaction.type === 'Expense') {
            acc[key].expense += Number(transaction.amount)
        }

        return acc
    }, {})    

    const handleTimeFrameChange = (event) => {
        setTimeFrame(event.target.value)
    }

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value)
    }

    return { transactions, timeFrame, handleTimeFrameChange, reportType, handleReportTypeChange, trendData } 
}