import React from 'react'

export const Day = ({day, month, year}) => {
    const clickHandler = () => {
        if (day) {
            alert(`${day}, ${month}, ${year}`)
        }
        
    }
    return(
    <td onClick={clickHandler}>{day}</td>
    
    )
}