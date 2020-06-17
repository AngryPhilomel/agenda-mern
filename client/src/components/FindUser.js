import React, { useState, useEffect, useContext, useCallback} from 'react'
import {Dropdown} from 'react-bootstrap'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'



export const FindUser = ({calendar}) => {
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const {request} = useHttp()
    const {token} = useContext(AuthContext)


    const changeHandler = async event => {
        setQuery(event.target.value)
        const data = await request('/api/users', 'POST', {query}, {
            Authorization: `Bearer ${token}`
        })
        setUsers(data.message)
    }

   

    const renderList = useCallback(() => {
        const list = []
        users.forEach((u, index) => {
            list.push(<Dropdown.Item key={index} href="#/action-1">{u.displayName}</Dropdown.Item>)
            return u
        })
        return list
    }, [users])

    useEffect(() => {
        renderList()
    }, [users, renderList])

    return (
        <Dropdown className=" d-none d-sm-block" drop="left">
        <Dropdown.Toggle variant="success">
          Пользователи
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
            <input type="text" value={query} onChange={changeHandler} className="form-control"/>
            {renderList()}
          {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    )
}