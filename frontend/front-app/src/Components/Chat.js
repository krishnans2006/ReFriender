import React, {useState} from 'react'
import './chat.css'
import Message from './Message'

function Chat({chat, goBack, user}){
    const [newMessage, setNewMessage] = useState('')
    user = {
        name: 'Me'
    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault()
        //Call backend w/ new message
        setNewMessage('')
    }

    return(
        <div className='Chat'>
            <button onClick={goBack} className='Goback'>Go back</button>
            <h1 className='chatName'>{chat.name}</h1>  
            <hr className='lengthy'></hr>
            {chat.messages.map((key) => {
                if(key.sender === user.name){
                    return <Message iAmTheSender={true} message={key}/>
                } else {
                    return <Message iAmTheSender={false} message={key}/>
                }
            })
            }
            <div className={chat.messages.length > 8 ? 'sendS' : 'sendP'}>
                <input 
                type = 'text'
                placeholder='Send a message'
                onChange={handleChange}
                value={newMessage}
                required
                className='sendAText'
                />
                <button className='sendert' onClick={submit}>Send</button>
            </div>
        </div>
    )
}

export default Chat