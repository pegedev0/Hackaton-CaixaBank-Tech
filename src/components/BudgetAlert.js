// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { resetBudgetAlert, updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas
import AlertBanner from '../components/AlertBanner'
import { GetTotalExpenses } from '../services/GetTotalExpenses'

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const totalExpenses = GetTotalExpenses()

    const budgetExceeded = totalExpenses > userSettings.totalBudgetLimit; 

    const categoryExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'Expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount);
        }
        return acc
    }, {})

    const exceededCategories = Object.keys(userSettings.categoryLimits).filter(category =>
        categoryExpenses[category] > userSettings.categoryLimits[category]
    )

    useEffect(() => {
        budgetExceeded ? updateBudgetAlert('Total expenses exceed the total budget limit!') : resetBudgetAlert()
    }, [budgetExceeded, userSettings.totalBudgetLimit]);

    return (
        budgetExceeded || exceededCategories
            ? <AlertBanner />
            : null
    )
}

export default BudgetAlert;
