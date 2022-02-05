import React, {useState} from 'react'
import '../App.css'

//Fetch user data in state from app or redux
    //Image
    //Name
    //etc.
function Navbar({}){
    const name = 'placeholder'
    return(
        <nav className = 'navbar'>
            <h1 className = 'margin-left'>ReFriendler</h1>
            <div className='hello'>
                <h1>{`Hello, ${name}`}</h1>
            </div>
        </nav>
    )
}

export default Navbar