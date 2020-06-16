import {useState, useCallback} from 'react'
import {useAuth} from './auth.hook'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)
    const {logout} = useAuth()

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            if (response.status === 401) {
                logout()
            }
            const data = await response.json()

            if (!response.ok || response.status === 202) {
                setStatus(response.status)
                throw new Error(data.message || 'Что-то пошло не так.')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [logout])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, status}
}