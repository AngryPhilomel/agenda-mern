import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from './Loader'
import { CalendarContext } from '../context/calendar/CalendarContext'

export const AllCalendars = () => {
    const {loading} = useHttp()

    const {calendars, getAll} = useContext(CalendarContext)

    useEffect(() => {
        getAll()
    }, [getAll])

    
    if (loading) {
        return <Loader/>
    }
    if (calendars) {
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
    } else {
        return(
            <div>Здесь ничего нет</div>
        )
    }
}