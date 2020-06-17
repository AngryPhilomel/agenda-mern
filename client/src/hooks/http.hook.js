import {useState, useCallback} from 'react'
import {useAuth} from './auth.hook'
import {useHistory} from 'react-router-dom'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)
    const {logout} = useAuth()
    const history =  useHistory()

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
                history.push('/')
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
    }, [logout, history])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError, status}
}