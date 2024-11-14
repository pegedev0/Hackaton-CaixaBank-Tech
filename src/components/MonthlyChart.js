import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function MonthlyChart({ transactions }) {
    const dataMap = {}

    transactions?.forEach((transaction) => {
        const date = new Date(transaction.date)
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        if (!dataMap[month]) {
            dataMap[month] = { month, income: 0, expense: 0 }
        }

        if (transaction.type === 'Income') {
            dataMap[month].income += parseFloat(transaction.amount)
        } else if (transaction.type === 'Expense') {
            dataMap[month].expense += parseFloat(transaction.amount)
        }
    })

    const data = Object.values(dataMap).sort((a, b) => new Date(a.month) - new Date(b.month))

    return (
        <ResponsiveContainer width="100%" height={300} style={{ padding: 18, borderRadius: '15px', background: `${localStorage.getItem('theme') === 'dark' ? '#222' : 'white'}` }}>
            <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#8884d8" name="Expense" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default MonthlyChart
