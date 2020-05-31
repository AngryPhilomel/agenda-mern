import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/auth.context'
import { useAuth } from './hooks/auth.hook';
import {useRoutes} from './routes'

function App() {
  const {token, login, logout, ldap, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)



  return (
    <AuthContext.Provider value={{
      token, login, logout, ldap, isAuthenticated
    }}>
      <Router>
        <div className="container-fluid">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
