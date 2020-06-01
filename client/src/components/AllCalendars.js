import React, {useContext, useEffect, useCallback, useState} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {Loader} from './Loader'

export const AllCalendars = () => {
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)
    const [calendars, setCalendars] = useState()

    
    const getCalendars = useCallback( async () => {
        try {
            const calendarsServer = await request('/api/calendar', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCalendars(calendarsServer.message)
        } catch (e) {}
    }, [token, request])
    
    useEffect(() => {
        getCalendars()
    }, [getCalendars])
    
    if (loading) {
        return <Loader/>
    }
    return (
        <ul className="list-group list-group-flush">
           
            {calendars? calendars.map((cal) => {
                return (
                <Link key={cal._id} className="list-group-item" to={`/calendar/${cal._id}`}>{cal.title}</Link>
                )
                }
            ): null}
        </ul>
    )
}