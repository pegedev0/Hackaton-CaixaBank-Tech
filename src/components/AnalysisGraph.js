import React, { Suspense } from 'react'
import { useStore } from '@nanostores/react'
import { transactionsStore } from '../stores/transactionStore'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

function AnalysisGraphPrev() {
    const transactions = useStore(transactionsStore)

    const categories = [...new Set(transactions.map((transaction) => transaction.category))]

    const data = categories.map((category) => {
        const totalIncomes = transactions
            .filter((transaction) => transaction.category === category && transaction.type === 'Income')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

        const totalExpenses = transactions
            .filter((transaction) => transaction.category === category && transaction.type === 'Expense')
            .reduce((sum, transaction) => sum + Number(transaction.amount), 0)

        return { category, Income: totalIncomes, Expense: totalExpenses }
    })

    return (
        <ResponsiveContainer width="100%" height={400} style={{ padding: 18, borderRadius: '15px', background: `${localStorage.getItem('theme') === 'dark' ? '#222' : 'white'}` }}>
            <BarChart data={data}>
                <XAxis dataKey="category" interval={0} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}

function AnalysisGraph() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AnalysisGraphPrev />
        </Suspense>
    )
}

export default AnalysisGraph