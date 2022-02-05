import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import React from 'react'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import Navbar from './Components/Navbar'

/*
Query backend api for facebook data / instagram data
Yes or no thing
 */

function App() {
  return (
    <div className="App">
      <Navbar />
      <Profile/>
    </div>
  );
}

export default App;
