import React, {useContext} from 'react'
import {OverlayTrigger, Popover} from 'react-bootstrap'
import { CurrentContext } from '../../context/currentCalendar/currentContext'

export const Day = ({day, month, year}) => {
   
    const {calendar} = useContext(CurrentContext)
    console.log(calendar.events)

    return(
    
    <OverlayTrigger
        trigger="click"
        placement='auto'
        rootClose='true'
        overlay={
            <Popover id={`popover-positioned`}>
                <Popover.Title>{day}</Popover.Title>
                <Popover.Content>
                <table>
                    <tr>
                        <td>Some</td>
                    </tr>
                    <tr>
                        <td>Stupid</td>
                    </tr>
                    <tr>
                        <td>Shit</td>
                    </tr>
                </table>
                </Popover.Content>
            </Popover>
        }
        >
        <td style={{width: '60px'}}>{day}</td>
    </OverlayTrigger>
    
    )
}