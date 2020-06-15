import React from 'react'
import { Day } from './Day'

export const Week = ({mon}) => {
    const week = []
    const days_in_month = 33 - new Date(mon.getFullYear(), mon.getMonth(), 33).getDate()
    // console.log(days_in_month)

    const renderWeek = (mon) => {
        if (mon.getDate() === 1) {
            if (mon.getDay() === 0) {
                const day = 7
                for (let i = 1; i < day; i++) {
                    week.push(<Day key={mon.getDate() - i} day =''/>)
                }
            }
            for (let i = 1; i < mon.getDay(); i++) {
                week.push(<Day key={mon.getDate() - i} day =''/>)
            }
        }
        for (let i = mon.getDay(); i <= 7; i++) {
            if (mon.getDate() === days_in_month) {
                week.push(<Day key={mon.getDate()} day={mon.getDate()} month={mon.getMonth()} year={mon.getFullYear()}/>)
                break
            } else {
                week.push(<Day key={mon.getDate()} day={mon.getDate()} month={mon.getMonth()} year={mon.getFullYear()}/>)
                if (mon.getDay() + 1 === 1) {
                    break
                } else {
                    mon.setDate(mon.getDate()+1)
                }
               
            }
            // if (mon.getDate() === days_in_month) {
            //     for (let i = mon.getDay(); i < 7; i++) {
            //         week.push(<Day day ='...'/>)
            //     }
            // }
        }
        if (mon.getDate() === days_in_month && mon.getDay() !== 0) {
            for (let i = mon.getDay(); i < 7; i++) {
                week.push(<Day key={mon.getDate()+i} day =''/>)
            }
        }
    }
    renderWeek(mon)
    return (
        <tr>
            {week}
        </tr>
    )
}