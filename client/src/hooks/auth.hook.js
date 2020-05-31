import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ldap, setLdap] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, ldap) => {
        setToken(jwtToken)
        setLdap(ldap)
        localStorage.setItem(storageName, JSON.stringify({
            ldap, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setLdap(null)
        localStorage.removeItem(storageName)
    })

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.ldap)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, ldap, ready}
}