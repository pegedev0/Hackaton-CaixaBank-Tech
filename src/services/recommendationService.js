export const getRecommendationMessage = (transactions) => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const lastMonthDate = new Date(currentYear, currentMonth - 1)
    const lastMonth = lastMonthDate.getMonth()
    const lastMonthYear = lastMonthDate.getFullYear()

    const expenses = (month, year) =>
        transactions.filter((transaction) =>
            transaction.type === 'Expense' &&
            new Date(transaction.date).getMonth() === month &&
            new Date(transaction.date).getFullYear() === year
    )

    const totalThisMonth = expenses(currentMonth, currentYear).reduce((sum, transaction) => sum + Number(transaction.amount), 0)
    const totalLastMonth = expenses(lastMonth, lastMonthYear).reduce((sum, transaction) => sum + Number(transaction.amount), 0)

    if (totalLastMonth === 0) return "No hay registros de gastos del mes pasado. ¡Sigue registrando tus gastos para llevar un mejor control!"
    if (totalThisMonth > totalLastMonth) {
        const increasePercentage = (((totalThisMonth - totalLastMonth) / totalLastMonth) * 100).toFixed(2)
        return `Tus gastos han aumentado un ${increasePercentage} % con respecto al mes pasado. Considera revisar tus gastos.`
    }
    if (totalThisMonth < totalLastMonth) {
        const decreasePercentage = (((totalLastMonth - totalThisMonth) / totalLastMonth) * 100).toFixed(2)
        return `¡Buen trabajo! Has reducido tus gastos en un ${decreasePercentage} % en comparación con el mes pasado.`
    }
    return "Tus gastos se mantuvieron iguales con respecto al mes pasado."
}