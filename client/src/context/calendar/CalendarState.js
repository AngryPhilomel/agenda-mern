import React, {useReducer, useCallback, useContext} from 'react'
import { CalendarContext } from './CalendarContext'
import { calendarReducer } from './calendarReducer'
import { GET_CALENDARS} from '../types'
import {AuthContext} from '../auth.context'
import {useHttp} from '../../hooks/http.hook'

export const CalendarState = ({children}) => {
    const [state, dispatch] = useReducer(calendarReducer, null)
    
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    
        
    const getAll = useCallback( async () => {
            try {
                const calendarsServer = await request('/api/calendar', 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                dispatch({
                    type: GET_CALENDARS,
                    payload: calendarsServer.calendars
                })
            } catch (e) {}
        }, [token, request])

    const create = useCallback( async (title) => {
        try {
            await request('/api/calendar/new', 'POST', {title}, {
                    Authorization: `Bearer ${token}`
                })
            setTimeout(() => getAll(), 1000)
            
        } catch (e) {}
    }, [token, request, getAll])

    

    return (
        <CalendarContext.Provider value={{getAll, create, calendars: state}}>
            {children}
        </CalendarContext.Provider>
    )
}