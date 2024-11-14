import React from 'react'
import { Paper, Typography } from '@mui/material'

function Statistics({ averageDailyExpense, maxCategory, maxCategoryExpense }) {
    return (
        <Paper sx={{ padding: 2, mt: 2, width: 'fit-content', background: '#f6a473', color: '#222' }}>
            <Typography variant="h5" fontWeight={600} mb={1}>Key Statistics</Typography>
            <Typography style={{color: '#222'}}>Average Daily Expense: {averageDailyExpense.toFixed(2)} €</Typography>
            <Typography style={{color: '#222'}}>
                Highest Spending Category:  
                {maxCategory ? ` ${maxCategory} (${maxCategoryExpense.toFixed(2)} €)` : 'No data available'}
            </Typography>
        </Paper>
    )
}

export default Statistics
