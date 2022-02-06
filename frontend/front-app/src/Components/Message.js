import React from 'react'
import './message.css'

function Message({iAmTheSender, message}){
    
    return(
        <div className={iAmTheSender ? 'you' : 'notYou'}>
            <h3>{message.message}</h3>
        </div>
    )
}

export default Message