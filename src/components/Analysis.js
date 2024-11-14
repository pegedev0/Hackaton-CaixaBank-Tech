import {
    Box,
    Typography,
    Grid,
    Paper,
} from '@mui/material'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import FiltersAnalysis from './FiltersAnalisys'
import { useAnalysis } from '../hooks/useAnalysis'

function Analysis() {
    const { transactions, timeFrame, handleTimeFrameChange, reportType, handleReportTypeChange, trendData } = useAnalysis()

    const budgetData = [] 
    const trendDataArray = Object.values(trendData).sort((a, b) => new Date(a.key) - new Date(b.key))

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h2" gutterBottom fontWeight={600} color={localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}  textAlign={{ xs: 'center', sm: 'left' }}>
                Advanced Analysis
            </Typography>

            {transactions.length === 0 && (
                <Typography variant="h6" color="text.secondary">
                    No transactions available.
                </Typography>
            )}

            <FiltersAnalysis 
                timeFrame={timeFrame}
                handleTimeFrameChange={handleTimeFrameChange}
                reportType={reportType}
                handleReportTypeChange={handleReportTypeChange}
                trendDataArray={trendDataArray}
                budgetData={budgetData}
            />

            <Box mb={8} bgcolor='#b4cad8' px='20px' py='20px' borderRadius='15px'>
                {reportType === 'trend' && (
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12}>
                            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom color="text.secondary">
                                    Income and Expenses Trend
                                </Typography>

                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={trendDataArray}>
                                        <XAxis dataKey="key" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="income" stroke="#28B463" name="Income" />
                                        <Line type="monotone" dataKey="expense" stroke="#E74C3C" name="Expenses" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                )}

                {reportType === 'budget' && (
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom color="text.secondary">
                                    Budget vs. Actual Expenses
                                </Typography>

                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={budgetData}>
                                        <XAxis dataKey="key" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="budget" fill="#28B463" name="Budget" />
                                        <Bar dataKey="actual" fill="#E74C3C" name="Actual" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

export default Analysis
