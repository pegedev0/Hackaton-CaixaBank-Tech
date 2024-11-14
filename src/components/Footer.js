import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Facebook, Twitter, Instagram } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
            <hr style={{ width: '90%', opacity: '50%' }} />

            <Box 
                display="flex" 
                flexDirection={{ xs: 'column', sm: 'row' }} 
                justifyContent="center" 
                alignItems="center" 
                gap={{ xs: '1rem', sm: '2rem' }} 
                mt={2}
            >
                <Typography>
                    © {new Date().getFullYear()} Personal Finance Assistant
                </Typography>

                <Box display="flex" gap="0.5rem">
                    <Link to="#" aria-label="Facebook">
                        <IconButton>
                            <Facebook style={{ color: '#0764f7' }} />
                        </IconButton>
                    </Link>

                    <Link to="#" aria-label="Twitter">
                        <IconButton>
                            <Twitter style={{ color: '#24a3f0' }} />
                        </IconButton>
                    </Link>

                    <Link to="#" aria-label="Instagram">
                        <IconButton>
                            <Instagram style={{ color: '#f20bdd' }} />
                        </IconButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer
