import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { saveUserSettings, userSettingsStore } from "../stores/userSettingsStore";
import { GetTotalExpenses } from "../services/GetTotalExpenses";
import { updateBudgetAlert } from "../stores/budgetAlertStore";

export function useSettings () {
    const userSettings = useStore(userSettingsStore);

    const [ categoryLimits, setCategoryLimits ] = useState({})
    const [ budgetExceeded, setBudgetExceeded ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ totalBudgetLimit, setTotalBudgetLimit ] = useState(userSettings.totalBudgetLimit);
    const [ error, setError ] = useState('');
    const [ enableAlerts, setEnableAlerts ] = useState(true)

    useEffect(() => {
        setCategoryLimits(userSettings.categoryLimits);
    }, [userSettings])

    const totalExpenses = GetTotalExpenses()

    const handleSave = () => {
        const newSettings = {
            totalBudgetLimit,
            categoryLimits: categoryLimits,
            alertsEnabled: enableAlerts,
            budgetExceeded, 
        }
    
        saveUserSettings(newSettings)

        const totalCategoryLimit = Object.values(categoryLimits).reduce((a, b) => a + b, 0)

        if (totalCategoryLimit > totalBudgetLimit) {
            setError('The total category limits exceed the total budget limit!')
            setBudgetExceeded(true)
            setSuccessMessage('')
            return
        } else {
            setError('')
            setBudgetExceeded(false)
            setSuccessMessage('Settings saved successfully!')
        }       

        if (totalExpenses > totalBudgetLimit) {
            setBudgetExceeded(true)
            updateBudgetAlert('Total expenses exceed the total budget limit!')
        } else {
            setBudgetExceeded(false)
            updateBudgetAlert('')
        }
    }

    return { handleSave, budgetExceeded, successMessage, error, enableAlerts, setEnableAlerts, totalBudgetLimit, setTotalBudgetLimit, categoryLimits, setCategoryLimits }
}