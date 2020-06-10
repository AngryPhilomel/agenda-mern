import React from 'react'
import {Week} from './Week'

export const MonthCalendar = ({date}) => {
    const options = {
        year: 'numeric', month: 'long'
    }
    const stringDate = new Date(date).toLocaleDateString('ru', options)
    // .toLocaleString('ru-Ru', options)
    const days_in_month = 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
    // const date = new Date(date.getFullYear(), date.getMonth(), 1)
    const month = date.getMonth()
    const year = date.getFullYear()
    const mons = []

    const findAllMons = (month, year, days_in_month) => {
       
        for (let i = 1; i <= days_in_month; i++) {
            const date = new Date(year, month, i)
            if (date.getDay() === 1) {
                mons.push(date)
            }
        }
        if (mons[0].getDate()!== 1) {
            mons.unshift(new Date(year, month, 1))
        }
    }

    findAllMons(month, year, days_in_month)

    // const renderCal = (mons) => {
    //     return mons.map(mon => {
    //         return(
    //           <Week mon={mon}/>
    //         )
    //     })
    // }

    const renderCal = mons.map((mon, index) => {
        return(
            <Week key={index} mon={mon}/>
        )
    })



    return(
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="text-uppercase text-center" colSpan="7">{stringDate}</th>
                </tr>
            </thead>
            <tbody>
                {renderCal}
            </tbody>
        </table>
    )
}