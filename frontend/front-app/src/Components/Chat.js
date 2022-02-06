import React, {useState, useEffect} from 'react'
import './chat.css'
import Message from './Message'

function Chat({chat, goBack, user}){
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [time, setTime] = useState(0)

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }
    const submit = async (e) => {
        e.preventDefault()
        console.log(user)
        const request = await fetch(`http://localhost:5000/send`, {
            mode: 'cors',
            body: JSON.stringify({
                sender: getCookie('email'),
                receiver: user.email,
                message: newMessage
            }),
            headers: {"Content-Type": "application/json"},
            method: 'POST'
        })
        const data = await request.json()
        console.log(data)
        
        setNewMessage('')
    }
    chat.result.reverse()
    return(
        <div className='Chat'>
            <h1 className='chatName'><button onClick={goBack} className='Goback'>&emsp;Back&emsp;</button>&emsp;{chat.name}</h1>
            <hr className='lengthy'></hr>
            <div className='chatdivthing'>
                {chat.result.map((key) => {
                    if(key.Sender == getCookie('email')){
                        return <Message iAmTheSender={true} message={key.Message}/>
                    } else {
                        return <Message iAmTheSender={false} message={key.Message}/>
                    }
                })
                }
            </div>
            <div className='send'>
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