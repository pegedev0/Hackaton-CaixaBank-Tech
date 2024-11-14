import { CircularProgress, Typography, Box } from '@mui/material'

function Recommendations({ loading, error, message }) {
    if (loading) return <CircularProgress />
    if (error) return <Typography color="error">{error}</Typography>

    return (
        <Box sx={{ padding: 2, mt: 2, width: 'fit-content', borderRadius: '15px', background: '#c4d68c', color: '#222' }}>
            <Typography variant="h5" fontWeight={600} mb={1} style={{color: '#222'}}>Recommendations</Typography>
            <Typography style={{color: '#222'}}>{message}</Typography>
        </Box>
    )
}

export default Recommendations
