import { useEffect, useState } from "react";

export function useDarkMode () {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    const toggleTheme = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'dark') {
            setIsDarkMode(true)
        }
    }, [])

    return { toggleTheme, isDarkMode }
}