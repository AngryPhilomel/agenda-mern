import React, { useState, useEffect, useContext, useCallback} from 'react'
import {Dropdown, OverlayTrigger, Button, Popover} from 'react-bootstrap'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'

import { FindUserItem } from './FindUserItem'



export const FindUser = ({calendar}) => {
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)

    const updateList = useCallback(async() => {
        const data = await request('/api/users', 'POST', {query}, {
            Authorization: `Bearer ${token}`
        })
        setUsers(data.message)
    }, [query, request, token])

    const changeHandler = async event => {
        setQuery(event.target.value)
        updateList()
    }

    const clickHandler = useCallback(() => {
        const q = query
        setTimeout(() => {
            updateList()
        },[500])
    }, [updateList])

    const renderList = useCallback(() => {
        const list = []
        users.forEach((u, index) => {
            list.push(<Dropdown.Item key={index} onClick={clickHandler}>
                        <FindUserItem calendar={calendar} user={u} />
                    </Dropdown.Item>)
            return u
        })
        return list
    }, [users, calendar, clickHandler])

    useEffect(() => {
        renderList()
    }, [users, renderList])

    return (
        <>

        <OverlayTrigger
                trigger="click"
                key='left'
                placement='left'
                overlay={
                    <Popover id={`popover-positioned`}>
                        <Popover.Title><input type="text" value={query} onChange={changeHandler} className="form-control"/></Popover.Title>
                        <Popover.Content>
                        {renderList()}
                        </Popover.Content>
                    </Popover>
                }
      >
        <Button variant="success">Пользователи</Button>
      </OverlayTrigger>




       
      </>
    )
}