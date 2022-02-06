import React, {useState, useEffect} from 'react'
import Chat from './Chat'
import './Home.css'

function Home({user}){
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

    //Chats container maps through user.chats
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [highSchool, setHighschool] = useState('')
    const [middleSchool, setMiddleSchool] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [activeChat, setActiveChat] = useState(false)
    const [chats, setChats] = useState([])
    const [chatsData, setChatsData] = useState([])
    const [activer, setActiver] = useState([])
    const [time, setTime] = useState(0)
    const fetchData = async () => {
        const request = await fetch(`http://localhost:5000/profile/${getCookie("email")}`, {
            mode: 'cors'
        })
        const result = await request.json()

        return result;
    }

    useEffect(() => {
        ( async () => {
            const data = await fetchData()
            setFirstName(data.result.first_name)
            setLastName(data.result.last_name)
            setHighschool(data.result.high_school)
            setMiddleSchool(data.result.middle_school)
            setZipCode(data.result.zip_code)
        })()
    }, [])
    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const submitChanges = async (e) => {
        e.preventDefault()
        
        const request = await fetch(`http://localhost:5000/profilechange`, {
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userID: getCookie("email"), firstName, lastName, highSchool, middleSchool, zipCode}),
            method: 'POST'
        })
    }

    const expandChatBox = (chat) => {
        const realChat = chatsData.find((key) => {
            return chat.Sender === key.id
        })
        console.log(chatsData);
        setActiveChat(realChat)  // message data
        setActiver(chat)  // user data
    }
    const goBack = () => {
        setActiveChat(false)
        setActiver(false)
    }
    useEffect(() => {
        (async () => {
            const data = await fetch('http://localhost:5000/chats',{
                mode: 'cors',
                body: JSON.stringify({email: getCookie('email')}),
                method: 'POST',
                headers: {"Content-Type": "application/json"},
            })
            const realData = await data.json()
            if(realData.status === true){
                setChats([...realData.result])
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            const realrealData = []
            const realData = chats.map(async (key) => {
                const data = await fetch('http://localhost:5000/messages', {
                    mode: 'cors',
                    body: JSON.stringify({
                        sender: getCookie('email'),
                        receiver: key.email
                    }),
                    headers: {"Content-Type": "application/json"},
                    method: 'POST',
                })
                const realData2 = await data.json()
                setChatsData(prevState => [...prevState, realData2])
            })
            
        })()
    }, [chats])

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                const request = await('http://localhost:5000/messages', {
                    mode: 'cors',
                    body: JSON.stringify({
                        sender: getCookie("email"),
                        receiver: activer.email, 
                    }),
                    headers: {"Content-Type": "application/json"},
                    method: 'POST',
                })
                const data = await request.json() 
                setActiveChat([...data])
            })();
            
            setTime((prevTime) => prevTime + 1);
        }, 1000)
    }, [time])

    console.log(time)
    
    return(
        <div>   
            <div className='mainContainer'>
                <div className='chatsContainer'>
                    <h1>Chats</h1>
                    {chats.map((key) => {
                        return(
                            <div className='chatbox' onClick={() => {expandChatBox(key)}}>
                                <h2 className='name'>{key.first_name}</h2>
                            </div>
                        )
                    })}
                </div>

                <div className={activeChat ? 'chatTime' : 'ProfileContainer'}>
                    {activeChat ? <Chat chat={activeChat} goBack={goBack} user={activer}/> :
                    <div className='ProfileContainer'>
                        <div className='flexed'>
                            <img className = 'image' 
                            src = 'https://qph.fs.quoracdn.net/main-qimg-f521020f4e9761f812d1dd8e1de32ebb-c' alt = 'Plaec'>
                            </img>
                            <button className='changeProfilePic'>Edit/Change Profile Picture</button>
                        </div>
                        <div className='ProfileContainerLite'>
                            <div className='horizontal'>
                                <input 
                                type = 'text'
                                name = 'firstName'
                                value = {firstName}
                                onChange = {(e) => {handleThing(e, setFirstName)}}
                                className='standardInput smaller'
                                required
                                placeholder='First Name'
                                />

                                <input 
                                type = 'text'
                                name = 'lastName'
                                value = {lastName}
                                onChange = {(e) => {handleThing(e, setLastName)}}
                                className='standardInput smaller margin-left black'
                                required
                                placeholder='Last Name'
                                />
                            </div>

                            <input 
                            type = 'text'
                            name = 'zipcode'
                            value = {zipCode}
                            onChange = {(e) => {handleThing(e, setZipCode)}}
                            className='standardInput'
                            required
                            placeholder='Zip Code'
                            />

                            <input
                            type = 'text'
                            name = 'highSchool'
                            value = {highSchool}
                            onChange = {(e) => {handleThing(e, setHighschool)}}
                            className='standardInput'
                            required
                            placeholder='High School Name'
                            />

                            <input
                            type = 'text'
                            name = 'middleSchool'
                            value = {middleSchool}
                            onChange = {(e) => {handleThing(e, setMiddleSchool)}}
                            className='standardInput'
                            required
                            placeholder='Middle School Name'
                            />

                            <button onClick={submitChanges}className='smallButton'>Submit changes</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home