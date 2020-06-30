import React from 'react'

export const Scheduler = (({events}) => {

    const renderEvents = (events) => {
        const els = events.map(e => {
        return (<tr key={e._id}><td>{new Date(e.date).getHours()}:{new Date(e.date).getMinutes()}</td><td>{e.title}</td></tr>)
        })
        return els
    }

    return (
    <table className="table">
        <tbody>
            {renderEvents(events)}
        </tbody>
    </table>
    )
})