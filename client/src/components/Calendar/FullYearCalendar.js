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
    // const renderFullYear = fullYear.map(month => {
    //     return(<div className="col"> <MonthCalendar key={month} date={month}/> </div>)
    // })

    return (
        <>
        <div className="row">
            <div className="col"> <MonthCalendar key={fullYear[0]} date={fullYear[0]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[1]} date={fullYear[1]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[2]} date={fullYear[2]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[3]} date={fullYear[3]}/> </div>
        </div>
        <div className="row">
            <div className="col"> <MonthCalendar key={fullYear[4]} date={fullYear[4]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[5]} date={fullYear[5]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[6]} date={fullYear[6]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[7]} date={fullYear[7]}/> </div>
        </div>
        <div className="row">
            <div className="col"> <MonthCalendar key={fullYear[8]} date={fullYear[8]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[9]} date={fullYear[9]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[10]} date={fullYear[10]}/> </div>
            <div className="col"> <MonthCalendar key={fullYear[11]} date={fullYear[11]}/> </div>
        </div>
        </>
        // {/* {renderFullYear} */}
    )
}