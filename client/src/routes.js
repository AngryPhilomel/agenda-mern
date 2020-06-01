import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {AuthPage} from './pages/AuthPage'
import {MainPage} from './pages/MainPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
        <Switch>
            <Route path="/">
                <MainPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login">
                <AuthPage/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}