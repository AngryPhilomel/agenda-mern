import React, {useReducer, useCallback, useContext} from 'react'
import {CurrentContext} from './currentContext'
import {currentReducer} from './currentReducer'
import {GET_CALENDAR, NEXT_YEAR, PAST_YEAR, ACTUAL_YEAR, GET_LEAVES} from '../types'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../auth.context'

export const CurrentState = ({children}) => {
    const initialState = {
        calendar: {},
        date: Date.now(),
        leaves: {}
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

    const getLeaves = useCallback(async () => {
        try {
            const leaves = await request(`/api/users/leave/${state.calendar._id}`, 'POST' , null, {
                Authorization: `Bearer ${token}`
            })
            dispatch({
                type: GET_LEAVES,
                payload: leaves
            })
        } catch (e) {
            console.log(e)
        }
    }, [request, token, state.calendar._id])

    const nextYear = () => {
        const newDate = new Date(state.date).setFullYear(new Date(state.date).getFullYear()+1)
        dispatch({
            type: NEXT_YEAR,
            payload: newDate
        })
    }

    const pastYear = () => {
        const newDate = new Date(state.date).setFullYear(new Date(state.date).getFullYear()-1)
        dispatch({
            type: PAST_YEAR,
            payload: newDate
        })
    }

    const actualYear = () => {
        const newDate = Date.now()
        dispatch({
            type: ACTUAL_YEAR,
            payload: newDate
        })
    }

    const newEvent = async (event) => {
        await request(`/api/calendar/${calendar._id}/addevent`, 'POST' , event, {
            Authorization: `Bearer ${token}`
        })
        getCalendar(calendar._id)
    }
        
    const {calendar, date, leaves} = state
         

    return(
        <CurrentContext.Provider value={{
            calendar, date, leaves,
            getCalendar, getLeaves, nextYear, pastYear, actualYear, newEvent
        }}>
            {children}
        </CurrentContext.Provider>
    )
}