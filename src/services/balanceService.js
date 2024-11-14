export const calculateCumulativeBalance = (transactions) => {
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

    let cumulativeBalance = 0
    return sortedTransactions.map((transaction) => {
        const amount = transaction.type === 'Income' ? parseFloat(transaction.amount) : -parseFloat(transaction.amount)
        cumulativeBalance += amount
        return { date: transaction.date, Balance: cumulativeBalance }
    })
}