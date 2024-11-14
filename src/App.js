// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { lightTheme, darkTheme } from './theme'; 
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import Footer from './components/Footer';
import SupportPage from './components/SupportPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage'
import ProtectedRoute from './components/ProtectedRoute'; 
import { authStore } from './stores/authStore';
import { useStore } from '@nanostores/react';
import BudgetAlert from './components/BudgetAlert';
import NotFound from './components/NotFound';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const auth = useStore(authStore); 

  const {toggleTheme, isDarkMode} = useDarkMode()

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

      <CssBaseline /> 
      
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

          <Container sx={{ flex: 1, mt: 4 }}>
            
            <BudgetAlert /> 

            <Routes>

              <Route element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            </Routes>
          </Container>

          <Footer /> 

        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
