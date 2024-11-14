import { Grid2, Paper, Typography } from "@mui/material";

export default function DataCard ({ title, value, children }) {
    return (
        <Grid2 item xs={12} md={4} textAlign='center'>
            <Paper sx={{ paddingInline: 2, paddingTop: 0.5, paddingBottom: 0.5, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>

                <Typography variant="h5" data-testid="total-income" fontWeight={600}>
                    {value}€
                </Typography>
            
                {children}
            </Paper>
        </Grid2>
    )
}