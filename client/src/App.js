import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/auth.context'
import { useAuth } from './hooks/auth.hook';
import {useRoutes} from './routes'
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { CalendarState } from './context/calendar/CalendarState';
import { CurrentState } from './context/currentCalendar/CurrentState'
// import { Alert } from './components/Alert';

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
      <CalendarState>
        <CurrentState>
        <Router>
          {isAuthenticated && <Navbar displayName={displayName}/>}
          <div className="container-fluid">
            {routes}
          </div>
        </Router>
        {/* <Alert/> */}
        </CurrentState>
      </CalendarState>
    </AuthContext.Provider>
  )
}

export default App;
