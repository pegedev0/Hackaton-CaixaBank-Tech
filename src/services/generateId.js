export const generateId = () => {
    return Date.now().toString(30) + Math.random().toString(30).substring(2)
}