import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Avatar, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Link } from 'react-router-dom'
import NotificationPopup from './NotificationPopup'
import { GetTotalExpenses } from '../services/GetTotalExpenses'
import { useStore } from '@nanostores/react'
import { userSettingsStore } from '../stores/userSettingsStore'
import { transactionsStore } from '../stores/transactionStore'
import { authStore, logout } from '../stores/authStore'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import '../App.css'

const Navbar = ({toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [ showNotificationPopup, setShowNotificationPopup ] = useState(false)
    const transactions = useStore(transactionsStore)
    const auth = useStore(authStore)
    const isLargeScreen = useMediaQuery('(min-width: 768px)')
    
    const userSettings = useStore(userSettingsStore)
    const { totalBudgetLimit, categoryLimits } = userSettings

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setDrawerOpen(open)
    }

    const overTotalBudget = GetTotalExpenses() > totalBudgetLimit

    const categoryExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'Expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount)
        }
        return acc
    }, {})

    const exceededCategories = Object.keys(categoryLimits).filter(category =>
        categoryExpenses[category] > categoryLimits[category]
    )

    const notificationMessages = []
    if (overTotalBudget) {
        notificationMessages.push('Total expenses exceed the total budget limit!')
    }
    if (exceededCategories.length > 0) {
        exceededCategories.map((category) => notificationMessages.push(`You have exceeded your budget limit for ${category} (${categoryLimits[category]} €)!`)
    )}

    return (
        <>
            <AppBar position="static" sx={{ mt: '1rem', width: '95%', height: '4rem', mx: 'auto' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon style={{ color: 'white' }} />
                        </IconButton>

                        <IconButton color="inherit" onClick={toggleTheme}>
                            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>

                        <IconButton onClick={() => setShowNotificationPopup(true)}>
                            {
                                notificationMessages.length > 0
                                    ? (
                                        <Badge color="error" variant="dot">
                                            <NotificationsIcon style={{ color: 'white' }} />
                                        </Badge>
                                    )
                                    : (
                                        <Badge color="error">
                                            <NotificationsIcon style={{ color: 'white' }} />
                                        </Badge>
                                    )
                            }
                            
                        </IconButton>

                        {showNotificationPopup && notificationMessages.length > 0 && (
                            <NotificationPopup
                                open={showNotificationPopup}
                                messages={notificationMessages}
                                onClose={() => setShowNotificationPopup(false)}
                            />
                        )}
                    </Box>
                
                    {isLargeScreen && (
                        <Box className="links" sx={{ display: 'inline-flex', justifyContent: 'center', borderRadius: '10px', paddingInline: '10px', paddingTop: '2.5px', paddingBottom: '2.5px'  }}>
                            {auth.isAuthenticated && (
                                <>
                                    <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Dashboard</Link>
                                    <Link to="/transactions" style={{ margin: '0 10px', textDecoration: 'none', color: 'white'}}>Transactions</Link>
                                    <Link to="/settings" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Settings</Link>
                                    <Link to="/analysis" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Analysis</Link>
                                    <Link to="/support" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Support</Link>
                                </>
                            )}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                        {auth.isAuthenticated ? (
                            <>
                                <Button onClick={() => logout()} sx={{ px: '15px', py: '5px', bgcolor: 'gray', color: 'white' }}>
                                    Logout
                                </Button>
                                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Login</Link>
                                <Link to="/register" style={{ margin: '0 10px', textDecoration: 'none', color: 'white' }}>Register</Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} disableScrollLock>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ width: 250, marginTop: '1rem' }}
                >
                    {auth.isAuthenticated ? ( 
                        <>
                            <Link to="/" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Dashboard
                            </Link>

                            <Link to="/transactions" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Transactions
                            </Link>

                            <Link to="/settings" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Settings
                            </Link>

                            <Link to="/analysis" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Analysis
                            </Link>

                            <Link to="/support" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Support
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Login
                            </Link>

                            <Link to="/register" style={{ display: 'block', padding: '10px', paddingLeft: '20px', textDecoration: 'none', fontWeight: 600, color: `${isDarkMode ? 'white' : 'black'}` }}>
                                Register
                            </Link>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    )
}

export default Navbar