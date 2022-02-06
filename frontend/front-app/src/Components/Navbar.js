import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import '../App.css'
import './navbar.css'

//Fetch user data in state from app or redux
    //Image
    //Name
    //etc.
function Navbar({loggedIn}){
    loggedIn = true
    const name = 'placeholder'
    const history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        if(e.target.className === 'margin-left ReFriender'){
            history.push('/')
        } else{
            history.push('/selection')
        }
    }
    return(
        <div>
            <link rel='stylesheet' href='"https://fonts.google.com/specimen/Economica?query=economica"'/>
            <nav className = 'navbar'>
                <h1 className = 'margin-left ReFriender' onClick={handleClick}>ReFriendler</h1>

                <h1 className='look' onClick={handleClick}>{loggedIn ? 'Look For Old Relationships!' : null}</h1>

                <div className='hello'>
                    <h1>{loggedIn ? `Hello, ${name}` : 'Sign In!'}</h1>
                </div>
            </nav>
        </div>
    )
}

export default Navbar