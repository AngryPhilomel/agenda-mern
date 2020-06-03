import React, { useState, useContext } from 'react'
import { CalendarContext } from '../context/calendar/CalendarContext'

export const CreateCalendar = () => {
    const [title, setTitle] = useState('')

    const {create, calendars} = useContext(CalendarContext)

    const changeHandler = event => {
        setTitle(event.target.value)
    }

    const createHandler = async () => {
            if (title) {
                create(title, calendars)
                setTitle('')
            }
        
    }

    return (
        <div className="input-group mb-3">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Новый календарь" 
                value={title}
                onChange={changeHandler}
            />
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={createHandler}
                >Создать</button>
            </div>
        </div>
    )
}