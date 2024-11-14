import { useState } from "react"
import { addTransaction, deleteTransaction, updateTransaction } from "../stores/transactionStore"
import { generateId } from "../services/generateId" 
import { categoryKeywords } from "../constants/categoryKeywords"
import { allCategories } from "../constants/categories"

export function useManageTransactions () {
    const [showTransactionForm, setShowTransactionForm] = useState(false)
    const [transactionToEdit, setTransactionToEdit] = useState(null)

    const assignCategory = (description, type) => {
        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => description.toLowerCase().includes(keyword.toLowerCase()))) {
                return category
            }
        }
        return type === 'Income' ? "Other Incomes" : "Other Expenses"
    }

    const handleDeleteTransaction = (id) => {
        deleteTransaction(id)
    }

    const handleEdit = (transaction) => {
        setTransactionToEdit(transaction)
        setShowTransactionForm(true)
    }

    const handleAddTransaction = () => {
        setShowTransactionForm(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const fields = Object.fromEntries(new window.FormData(event.target))
        fields.id = transactionToEdit ? transactionToEdit.id : generateId()

        if (!transactionToEdit) {
            fields.category = assignCategory(fields.description, fields.type)
        }

        transactionToEdit ? updateTransaction(fields) : addTransaction(fields)

        if (!allCategories.includes(fields.category)) {
            allCategories.push(fields.category)
        }
    
        setShowTransactionForm(false)
        setTransactionToEdit(null)
    }

    return { showTransactionForm, handleDeleteTransaction, handleEdit, handleAddTransaction, handleSubmit, transactionToEdit }
}