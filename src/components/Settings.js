import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid2,
    Paper,
    Alert,
} from '@mui/material'
import { expenseCategories } from '../constants/categories'
import { useSettings } from '../hooks/useSettings'

function Settings() {
    const { handleSave, budgetExceeded, successMessage, error, enableAlerts, setEnableAlerts, totalBudgetLimit, setTotalBudgetLimit, categoryLimits, setCategoryLimits } = useSettings()

    return (
        <Box sx={{ p: 4, mb: 8 }}>
            <Typography variant="h2" gutterBottom fontWeight={600} color={localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}  textAlign={{ xs: 'center', sm: 'left' }}>
                Budget Settings
            </Typography>

            <FormControlLabel
                control={<Switch color="primary" />}
                label="Enable Alerts"
                checked={enableAlerts}
                onChange={() => setEnableAlerts(!enableAlerts)}
            />

            <Box mt={2} bgcolor='#c1b3e4' px='20px' py='15px' borderRadius='15px'>
                <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }} >
                    <Typography variant="h6" color="text.secondary">Total Budget Limit (€)</Typography>

                    <TextField
                        type="number"
                        name="totalBudgetLimit"
                        fullWidth
                        margin="normal"
                        inputProps={{ min: 0, step: '0.01' }}
                        sx={{ mt: 1 }}
                        value={totalBudgetLimit}
                        onChange={(e) => setTotalBudgetLimit(Number(e.target.value) || 0)}
                    />
                </Paper>
            </Box>

            <Box mt={2} bgcolor='#f6a473' px='20px' py='15px' borderRadius='15px'>
                <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                    <Typography variant="h6" color="text.secondary">Category Budget Limits (€)</Typography>
                    
                    <Grid2 container spacing={2} sx={{ mt: 1 }}>
                        {expenseCategories.map((category) => (
                            <Grid2 item xs={12} sm={6} md={4} key={category}>
                                <TextField
                                    label={category}
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    inputProps={{ min: 0, step: '0.01' }}
                                    value={categoryLimits[category] !== undefined ? categoryLimits[category] : '' }
                                    onChange={(e) => {
                                        const newCategoryLimits = { ...categoryLimits, [category]: Number(e.target.value) || 0 }
                                        setCategoryLimits(newCategoryLimits)
                                    }}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </Paper>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Box>

            
            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    You have exceeded your budget limit of {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

        </Box>
    )
}

export default Settings
