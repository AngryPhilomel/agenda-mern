import React, { useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import {useHttp} from '../hooks/http.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [form, setForm] = useState({
        ldap: '',
        password: '',
    })



    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        
    }

    const history =  useHistory()
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth', 'POST', {...form})
            auth.login(data.token, data.userId, data.displayName)
            history.push('/')
        } catch (e) {}
    }

    const pressEnter = e => {
        if (e.key === 'Enter') {
            loginHandler()
        }
    }


    return(
        <div onKeyDown={pressEnter} className="container">
                <div className="form-group">
                    <label htmlFor="ldap">LDAP</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="ldap" 
                        aria-describedby="emailHelp" 
                        placeholder="600xxxxx" 
                        name="ldap"
                        onChange={changeHandler}
                    />
                    <small id="emailHelp" className="form-text text-muted">Leroy Merlin.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Пароль"
                        name="password"
                        onChange={changeHandler}
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={loginHandler}
                >
                    Войти
                </button>
        </div>
    )
}