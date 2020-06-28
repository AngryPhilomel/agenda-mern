import React, { useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader'
import { CurrentContext } from '../context/currentCalendar/currentContext'
import {FullYearCalendar} from '../components/Calendar/FullYearCalendar'
import {FindUser} from '../components/FindUser'
import { AuthContext } from '../context/auth.context'


export const CalendarPage = () => {
    const linkId = useParams().id
    
    const {calendar, date, getCalendar, nextYear, pastYear, actualYear} = useContext(CurrentContext)
    const {userId} = useContext(AuthContext)

    useEffect(() => {
        getCalendar(linkId)
    }, [getCalendar, linkId])

    return (
    <>
    {calendar ? <p className="text-justify">{calendar.title}</p> : <Loader/>}
    
    {/* {calendar.admins.includes(userId, 0) ? userId : null} */}
    <hr/>
    <div className="row d-flex justify-content-between">

    <div className="col-2 btn-group" role="group">
        <button onClick={pastYear} type="button" className="btn btn-secondary">Прошлый</button>
        <button onClick={actualYear} type="button" className="btn btn-secondary">Текущий</button>
        <button onClick={nextYear} type="button" className="btn btn-secondary">Следующий</button>
    </div>
   
    {calendar.admins == userId ? <FindUser className="col-2" calendar={linkId}/> : null}
    
    

    </div>
    <hr/>
    {/* {new Date(date).toLocaleDateString('RU')} {new Date(date).toLocaleTimeString('RU')} */}
    <FullYearCalendar selectDate={new Date(date)}/>
    {/* <MonthCalendar selectDate={new Date(date)}/> */}
    </>
    )
}