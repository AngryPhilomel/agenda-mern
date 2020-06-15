import React from 'react'

export const Day = ({day, month, year}) => {
    const clickHandler = () => {
        if (day) {
            alert(`${day}, ${month}, ${year}`)
        }
        
    }
    return(
    <td style={{width: '60px'}} onClick={clickHandler}>{day}</td>
    
    )
}