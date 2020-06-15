import React, { useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader'
import { CurrentContext } from '../context/currentCalendar/currentContext'
import {FullYearCalendar} from '../components/Calendar/FullYearCalendar'


export const CalendarPage = () => {
    const linkId = useParams().id
    
    const {calendar, date, getCalendar, nextYear, pastYear, actualYear} = useContext(CurrentContext)

    useEffect(() => {
        getCalendar(linkId)
    }, [getCalendar, linkId])

    return (
    <>
    {calendar ? calendar.title : <Loader/>}<hr/>
    <div className="btn-group" role="group">
        <button onClick={pastYear} type="button" className="btn btn-secondary">Прошлый</button>
        <button onClick={actualYear} type="button" className="btn btn-secondary">Текущий</button>
        <button onClick={nextYear} type="button" className="btn btn-secondary">Следующий</button>
    </div>
    <hr/>
    {/* {new Date(date).toLocaleDateString('RU')} {new Date(date).toLocaleTimeString('RU')} */}
    <FullYearCalendar selectDate={new Date(date)}/>
    {/* <MonthCalendar selectDate={new Date(date)}/> */}
    </>
    )
}