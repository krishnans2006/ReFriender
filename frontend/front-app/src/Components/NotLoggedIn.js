import React, {useState} from 'react'
import Signup from './Signup'
import Login from './Login'
import './notLoggedIn.css'

function NotLoggedIn({doIt}){
    const [signUp, setSignUp] = useState(false)
    const signed = (e) => {
        setSignUp(true)
        doIt()
    }
    return(
        <div className= {signUp ? 'App' : null}>
            {
                signUp ? <Signup /> :
                <div>
                    <h1 className='center'>Welcome To Refriendler</h1>
                    <Login doIt = {signed}/>
                </div>
            }
        </div>
    )
}

export default NotLoggedIn