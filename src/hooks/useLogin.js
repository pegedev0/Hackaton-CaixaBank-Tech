import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../stores/authStore"

export function useLogin () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showCredentials, setShowCredentials] = useState(false)
    const navigate = useNavigate()

    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Email and passwords are required')
            return
        }

        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (
            (email === defaultCredentials.email && password === defaultCredentials.password) ||
            (storedUser && email === storedUser.email && password === storedUser.password)
        ) {
            login({ email, password })
            navigate('/')
        } else {
            setError('Invalid credentials. Please, try again.')
        }
            
    }

    const handleShowDefaultCredentials = () => {
        setEmail(defaultCredentials.email)
        setPassword(defaultCredentials.password)
        setShowCredentials(true)
    }

    return { handleLogin, email, setEmail, password, setPassword, error, showCredentials, defaultCredentials, handleShowDefaultCredentials }
}