import React, {useContext, useState, useEffect} from 'react'
import {OverlayTrigger, Popover, Accordion, Card} from 'react-bootstrap'
import {CurrentContext} from '../../context/currentCalendar/currentContext'

import {Scheduler} from './Scheduler'

export const Day = ({day, month, year}) => {
    const [dots, setDots] = useState(false)
    const [marker, setMarker] = useState(null)
    const [parsedEvents, setParsedEvents] = useState(null)
   
    const {calendar} = useContext(CurrentContext)

    

    // const parseEvents = (calendar) => {
    //     if (calendar.events) {
    //         const eventDate = new Date(calendar.events[0].date)
    //        if (eventDate.getFullYear() === year) {
    //            if (eventDate.getMonth() === month) {
    //                if (eventDate.getDate() === day) {
    //                 setDots(true)
    //                 return (<p>{calendar.events[0].title}</p>)
    //                }
    //            }
    //        }
    //     }
    // }

    const parseEvents = (calendar) => {
        if (calendar.events) {
            const eventsArray = calendar.events.map((event) => {
                const eventDate = new Date(event.date)
                if (eventDate.getFullYear() === year) {
                if (eventDate.getMonth() === month) {
                   if (eventDate.getDate() === day) {
                    setDots(true)
                    return (event)
                   }
               }
           }
            })
            return eventsArray
        }
    }


    const renderDots = () => {
        if (dots){
            setMarker(<> .</>)
        }
    }

    useEffect(() => {
        setParsedEvents(parseEvents(calendar))
    }, [calendar])

    useEffect(() => {
        renderDots()
    }, [dots])
    // нужна нормальная зависимость

    return(
    
    <OverlayTrigger
        trigger="click"
        placement='auto'
        rootClose='true'
        overlay={
            
            <Popover id={`popover-positioned`}>
                {/* <Popover.Title>{day}.{month+1}.{year}</Popover.Title> */}
                
                <Popover.Content bsPrefix='popover-body p-0'>
                    {/*  */}

                    <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        Расписание
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>{dots ? <Scheduler events={parsedEvents}></Scheduler> : <p>Ничего нет</p>}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                        Больничные\Отпуска
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Тут будут отпуска участников</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>

                    {/*  */}
                    {/* {dots ? <Scheduler events={parsedEvents}></Scheduler> : <p>Ничего нет</p>} */}
                </Popover.Content>
            </Popover>
        }
        >
        <td style={{width: '60px'}}>{day}{marker}</td>
    </OverlayTrigger>
    
    )
}