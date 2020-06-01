import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/auth.context'
import { useAuth } from './hooks/auth.hook';
import {useRoutes} from './routes'
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';

function App() {
  const {token, login, logout, userId, displayName, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, displayName, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar displayName={displayName}/>}
        <div className="container-fluid">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
