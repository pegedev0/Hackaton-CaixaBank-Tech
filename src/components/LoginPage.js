import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid
} from '@mui/material'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom'

function LoginPage() {
    const { handleLogin, email, setEmail, password, setPassword, error, showCredentials, defaultCredentials, handleShowDefaultCredentials } = useLogin()

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>

            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {showCredentials && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    <strong>Email:</strong> {defaultCredentials.email}<br />
                    <strong>Password:</strong> {defaultCredentials.password}
                </Alert>
            )}

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                    <Link to="/register" variant="body2" underline="hover" style={{ textDecoration: 'none', color: `${localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}` }}>
                        Crear cuenta
                    </Link>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Link to="/forgot-password" variant="body2" underline="hover" style={{ textDecoration: 'none', color: `${localStorage.getItem('theme') === 'dark' ? 'white' : '#222'}` }}>
                        Olvidé mi contraseña
                    </Link>
                </Grid>
            </Grid>

            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleShowDefaultCredentials}
            >
                Show default credentials
            </Button>
        </Box>
    )
}

export default LoginPage
