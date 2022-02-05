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
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <Router> 
      <Switch>
        <Route path="/">
          {loggedIn ? <Home /> : <NotLoggedIn />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
