import React, { useState, useContext } from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'

export const CreateCalendar = () => {
    const [title, setTitle] = useState('')
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const changeHandler = event => {
        setTitle(event.target.value)
    }

    const createHandler = async () => {
        try {
            const cal = await request('/api/calendar/new', 'POST', {title}, {
                Authorization: `Bearer ${token}`
            })
            setTitle('')
        } catch (e) {}
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