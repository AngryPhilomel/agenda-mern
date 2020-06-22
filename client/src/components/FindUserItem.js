import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'

import {PlusIcon, DiffRemovedIcon} from '@primer/octicons-react'



export const FindUserItem = ({calendar, user}) => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const [haveAccess, setAccess] = useState(false)

    useEffect(() => {
        const access = user.calendars.find((cal) => {
            return cal === calendar
        })
        setAccess(access)
    }, [haveAccess, calendar, user.calendars])

    
    

    const addHandler = async (e) => {
        await request(`/api/calendar/${calendar}/adduser`, 'POST', {userId: user._id}, {
            Authorization: `Bearer ${token}`
        })
        setAccess(true)
    }

    const removeHandler = async () => {
        await request(`/api/calendar/${calendar}/removeuser`, 'POST', {userId: user._id}, {
            Authorization: `Bearer ${token}`
        })
        setAccess(false)
    }
   

    return (
        <div className="row justify-content-between">
                            <div className="col-3">{user.displayName}</div>
                            {!haveAccess ? 
                                <div className="col-1" onClick={addHandler}><PlusIcon size={16} /></div> : 
                                <div className="col-1" onClick={removeHandler}><DiffRemovedIcon size={16} /></div> }
                        </div>
    )
}