import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [displayName, setDisplayName] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, userId, displayName) => {
        setToken(jwtToken)
        setUserId(userId)
        setDisplayName(displayName)
        localStorage.setItem(storageName, JSON.stringify({
            userId,
            token: jwtToken,
            displayName
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setDisplayName(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.userId) {
            login(data.token, data.userId, data.displayName)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, displayName, ready}
}