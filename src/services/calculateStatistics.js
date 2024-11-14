export const calculateStatistics = (transactions) => {
    const expenseTransactions = transactions.filter((transaction) => transaction.type === 'Expense')
    const totalExpense = expenseTransactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)
    const uniqueDates = [...new Set(expenseTransactions.map((transaction) => transaction.date))]
    const averageDailyExpense = uniqueDates.length > 0 ? totalExpense / uniqueDates.length : 0

    const categoryExpenses = expenseTransactions.reduce((acc, transaction) => {
        const { category, amount } = transaction
        acc[category] = (acc[category] || 0) + Number(amount)
        return acc
    }, {})

    const maxCategory = Object.keys(categoryExpenses).reduce((max, category) => {
        return categoryExpenses[category] > (categoryExpenses[max] || 0) ? category : max
    }, null)

    return {
        totalExpense,
        averageDailyExpense,
        maxCategory,
        maxCategoryExpense: maxCategory ? categoryExpenses[maxCategory] : 0
    }
}