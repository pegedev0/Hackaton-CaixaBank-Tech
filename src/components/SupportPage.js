import React, { useState, useEffect, Profiler, Suspense, useMemo } from 'react';
import { Box, Typography, CircularProgress, Paper, List, TextField } from '@mui/material';
import { onRenderCallback } from '../utils/onRenderCallback';
import ContactListItem from './ContactListItem';

function SupportPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res =  await fetch('https://jsonplaceholder.typicode.com/users')
                if (res.ok) {
                        const data = await res.json()
                        setUsers(data)
                } else {
                    setError('Error fetching data!')
                }
            } catch (err) {
                setError('Error making the request!')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [users, searchTerm])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        )
    }

    return (
        <Profiler id="SupportPage" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h2" gutterBottom fontWeight={600} color={localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}  textAlign={{ xs: 'center', sm: 'left' }}>
                    Support Contacts
                </Typography>

                <Box bgcolor='#c1b3e4' px='20px' py='20px' borderRadius='15px' mb={2}>
                    <TextField
                        style={{ borderRadius: 4, background: `${localStorage.getItem('theme') === 'dark' ? '#222' : '#c1b3e4'}` }}
                        label="Search by Name"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Box>

                <Suspense fallback={<CircularProgress />}>
                    <Box mb={8} bgcolor='#b4cad8' px='20px' py='20px' borderRadius='15px'>
                        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                            <List>
                                {filteredUsers.map((user) => (
                                    <ContactListItem user={user} />
                                ))}
                            </List>
                        </Paper>
                    </Box>
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default SupportPage;