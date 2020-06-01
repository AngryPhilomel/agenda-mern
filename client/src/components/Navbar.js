import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'

export const Navbar = ({displayName}) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">AGENDA</NavLink>
           
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="#">Новый календарь</NavLink>
                </li>
                <li className="nav-item">
                    <span className="nav-link">{displayName}</span>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={logoutHandler}>Выход</a>
                </li>
                </ul>
            </div>
        </nav>
    )
}