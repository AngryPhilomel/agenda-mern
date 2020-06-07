import React, {useReducer, useCallback, useContext} from 'react'
import {CurrentContext} from './currentContext'
import {currentReducer} from './currentReducer'
import { GET_CALENDAR } from '../types'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../auth.context'

export const CurrentState = ({children}) => {
    const initialState = {
        calendar: {},
        date: Date.now()
    }
    const [state, dispatch] = useReducer(currentReducer, initialState)
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const getCalendar = useCallback(async (id) => {
        try {
            const serverCalendar = await request(`/api/calendar/${id}`, 'GET' , null, {
                Authorization: `Bearer ${token}`
            })
            dispatch({
                type: GET_CALENDAR,
                payload: serverCalendar
            })
        } catch (e) {}
    }, [request, token])
    const {calendar, date} = state
         

    return(
        <CurrentContext.Provider value={{
            calendar, date,
            getCalendar
        }}>
            {children}
        </CurrentContext.Provider>
    )
}