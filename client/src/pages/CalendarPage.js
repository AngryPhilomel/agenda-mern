import React, { useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader'
import { CurrentContext } from '../context/currentCalendar/currentContext'
import {FullYearCalendar} from '../components/Calendar/FullYearCalendar'


export const CalendarPage = () => {
    const linkId = useParams().id
    
    const {calendar, date, getCalendar} = useContext(CurrentContext)

    useEffect(() => {
        getCalendar(linkId)
    }, [getCalendar, linkId])

    return (
    <>
    {calendar ? calendar.title : <Loader/>}<hr/>
    {/* {new Date(date).toLocaleDateString('RU')} {new Date(date).toLocaleTimeString('RU')} */}
    <FullYearCalendar selectDate={new Date(date)}/>
    {/* <MonthCalendar selectDate={new Date(date)}/> */}
    </>
    )
}