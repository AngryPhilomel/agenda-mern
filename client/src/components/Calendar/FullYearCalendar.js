import React from 'react'
import {MonthCalendar} from './MonthCalendar'

export const FullYearCalendar = ({selectDate}) => {
    const fullYear = []
    const getFullYear = (selectDate) => {
        const year = selectDate.getFullYear()
        for(let i = 0; i < 12; i++) {
            fullYear.push(new Date(year, i, 1))
        }
    }
    getFullYear(selectDate)
    const renderFullYear = fullYear.map(month => {
        return(<div className="col-auto"> <MonthCalendar key={month} date={month}/> </div>)
    })

    return (
        <div className="row justify-content-center">
            {renderFullYear}
        </div>
    )
}