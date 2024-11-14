import React, { Profiler } from 'react'
import { useStore } from '@nanostores/react'
import { Box, Typography, Grid2, Alert } from '@mui/material'
import { onRenderCallback } from '../utils/onRenderCallback'
import { transactionsStore } from '../stores/transactionStore'
import { GetTotalExpenses } from '../services/GetTotalExpenses'
import DownloadProfilerData from './DownloadProfilerData'
import ExportButton from './ExportButton'
import MonthlyChart from './MonthlyChart'
import DataCard from './DataCard'
import { usePaginateTransactions } from '../hooks/usePaginateTransactions'
import { useFilterTransactions } from '../hooks/useFilterTransactions'
import TableOfTransactions from './TableOfTransactions'
import { useManageTransactions } from '../hooks/useManageTransactions'
import { calculateStatistics } from '../services/calculateStatistics'
import { calculateCumulativeBalance } from '../services/balanceService'
import { getRecommendationMessage } from '../services/recommendationService'

const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'))
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'))
const Statistics = React.lazy(() => import('./Statistics'))
const Recommendations = React.lazy(() => import('./Recommendations'))

function Dashboard() {
    const transactions = useStore(transactionsStore)

    const { averageDailyExpense, maxCategory, maxCategoryExpense } = calculateStatistics(transactions)
    const dataBalance = calculateCumulativeBalance(transactions)
    const message = getRecommendationMessage(transactions)

    const { handleEdit, handleDeleteTransaction } = useManageTransactions()
    const { filteredAndSortedTransactions } = useFilterTransactions()
    const { paginatedTransactions } = usePaginateTransactions({ filteredAndSortedTransactions })

    const totalIncome = transactions.reduce((sum, transaction) => transaction.type === 'Income' ? sum + Number(transaction.amount) : sum, 0)
    const totalExpense = GetTotalExpenses()
    const balance = totalIncome - totalExpense

    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography variant="h2" gutterBottom fontWeight={600} color={localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}  textAlign={{ xs: 'center', sm: 'left' }}>
                    Dashboard
                </Typography>

                <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='1rem' mt={{ xs: 2, md: -2 }} marginTop={-2}>
                    <Grid2 alignItems='center' justifyContent='center' container spacing={2} sx={{ mt: 2 }} bgcolor='#c1b3e4' width='fit-content' px='20px' py='10px' borderRadius='15px'>
                        <Grid2 item xs={12} sm={4} >
                            <DataCard title='Total Incomes' value={totalIncome} />
                        </Grid2>

                        <Grid2 item xs={12} sm={4}>
                            <DataCard title='Total Expenses' value={totalExpense} />
                        </Grid2>

                        <Grid2 item xs={12} sm={4}>
                            <DataCard title='Balance' value={balance} children={
                                balance < 0 && 
                                    <Alert severity="warning" sx={{ mb: 2 }}>
                                        Negative balance!
                                    </Alert>
                                }
                            />
                        </Grid2>
                    </Grid2>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            mt: 2,
                            alignItems: 'center',
                            bgcolor: '#b4cad8',
                            width: { xs: '100%', sm: 'fit-content' },
                            px: '20px',
                            py: '10px',
                            borderRadius: '15px',
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                        }}
                    >
                        <ExportButton data={transactions} headers={['description', 'amount', 'type', 'date']} />
                        <DownloadProfilerData />
                    </Box>
                </Box>

                <React.Suspense fallback={<div>Loading...</div>}>
                    <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap='1rem'>
                        <Statistics
                            totalExpense={totalExpense} 
                            averageDailyExpense={averageDailyExpense} 
                            maxCategory={maxCategory} 
                            maxCategoryExpense={maxCategoryExpense} 
                        />
                        <Recommendations message={message} />
                    </Box>
                    
                    <Box style={{ padding: 24, borderRadius: '15px', marginTop: '20px', background: '#fcdf71', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="h5" fontWeight={600} color='#222'>Recent transactions</Typography>
                        
                        <TableOfTransactions
                            paginatedTransactions={paginatedTransactions} 
                            handleEdit={handleEdit} 
                            handleDeleteTransaction={handleDeleteTransaction}        
                        />
                    </Box>

                    <Box mb={4} style={{ padding: 24, borderRadius: '15px', marginTop: '20px', background: '#b5cbd8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="h5" fontWeight={600} color='#222'>Analysis</Typography>

                        <AnalysisGraph />

                        <BalanceOverTime data={dataBalance} dataKeyX="date" dataKeyY="Balance" lineColor="#8884d8" />

                        <MonthlyChart transactions={transactions} />
                    </Box>
                        
                </React.Suspense>
            </Box>
        </Profiler>
    )
}

export default Dashboard
