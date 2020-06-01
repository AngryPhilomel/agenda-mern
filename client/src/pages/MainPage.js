import React from 'react'
import { CreateCalendar } from '../components/CreateCalendar'
import { AllCalendars } from '../components/AllCalendars'

export const MainPage = () => {
    return(
        <div className="container mt-2">
            <CreateCalendar/>
            <AllCalendars/>
        </div>
    )
}