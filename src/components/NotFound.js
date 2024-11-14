import { Box, Typography } from "@mui/material"

export default function NotFound () {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3">Not Found</Typography>
            <Typography>The resource requested could not be found!</Typography>
        </Box>
    )
}