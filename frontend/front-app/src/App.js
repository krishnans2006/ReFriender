import React, {useState} from 'react'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import NotLoggedIn from './Components/NotLoggedIn'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Home from './Components/Home'


/*
Query backend api for facebook data / instagram data
Yes or no thing
 */

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const doIt = (e) => {
    /*Edit user from login page *login page reqs user data and passes it back to app so app can pass it on to others */
    setUser(e)
  }
  return (
    <Router> 
      <Navbar loggedIn = {loggedIn}/>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Home user = {user}/> : <NotLoggedIn doIt = {doIt}/>}
        </Route>

        <Route path='/home'>
          <Home />
        </Route>

        <Route path='/selection'>
          {user ? <Profile user = {user}/> : null}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
