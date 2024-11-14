import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import ExportButton from "./ExportButton"

export default function FiltersAnalysis ({ timeFrame, handleTimeFrameChange, reportType, handleReportTypeChange, trendDataArray, budgetData }) {
    return (
        <Grid container spacing={2} display='flex' alignItems="center" justifyContent='center' sx={{ mt: 2, mb: 2, ml: 0 }} bgcolor='#c1b3e4' width={{xs: '100%', sm:'60%'}} px='20px' py='20px' borderRadius='15px'>
            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="timeframe-select-label" style={{  borderRadius: 4, paddingInline: 8, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}>Time Frame</InputLabel>
                    
                    <Select
                        labelId="timeframe-select-label"
                        id="timeframe-select"
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                        label="Time Frame"
                        style={{ background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel id="report-type-select-label" style={{ borderRadius: 4, paddingInline: 8, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}>Report Type</InputLabel>
                    <Select
                        labelId="report-type-select-label"
                        id="report-type-select"
                        value={reportType}
                        onChange={handleReportTypeChange}
                        label="Report Type"
                        style={{ background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                    >
                        <MenuItem value="trend">Trend Analysis</MenuItem>
                        <MenuItem value="budget">Budget vs. Actual</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <ExportButton
                    data={reportType === 'trend' ? trendDataArray : budgetData}
                    filename={`report_${reportType}.csv`}
                    headers={reportType === 'trend' ? ['Date', 'Income', 'Expense'] : ['Budget', 'Actual']}
                />
            </Grid>
        </Grid>
    )
}