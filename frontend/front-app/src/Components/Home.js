import React, {useState, useEffect} from 'react'
import Chat from './Chat'
import './Home.css'

function Home({user}){
    //Chats container maps through user.chats
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [facebook, setFacebook] = useState('')
    const [highSchool, setHighschool] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [activeChat, setActiveChat] = useState(false)

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const submitChanges = async (e) => {
        e.preventDefault()
    }
    const expandChatBox = (chat) => {
        setActiveChat(chat)
    }
    const goBack = () => {
        setActiveChat(false)
    }
    const fakeUser = {
        chats: [
            {
                name: 'Arihan Sharma',
                messages: ['Up yet?']
            },
            {
                name: 'Jun Li',
                messages: ['Yoooo that was so sick!!!']
            },
            {
                name: 'Berke Altiparmak',
                messages: ['we can do that right']
            },
            {
                name: 'Dacid Max',
                messages: ['GET functionality']
            },
            {
                name: 'Monsieur Chow',
                messages: [
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Me',
                        message: 'Hello mate, I am I!'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Me',
                        message: 'Hello mate, I am I!'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Me',
                        message: 'Hello mate, I am I!'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Me',
                        message: 'Hello mate, I am I!'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                    {
                        sender: 'Me',
                        message: 'Hello mate, I am I!'
                    },
                    {
                        sender: 'Monsieur Chow',
                        message: 'Hello maate i am monsieur chow and french people do speak like britih'
                    },
                ]
            }
        ]
    }
    return(
        <div>   
            <div className='mainContainer'>
                <div className='chatsContainer'>
                    <h1>Chats</h1>
                    {fakeUser.chats.map((key) => {
                        return(
                            <div className='chatbox' onClick={() => {expandChatBox(key)}}>
                                <h2 className='name'>{key.name}</h2>
                                <h2 className='last'>{key.messages[0].message}</h2> {/*Make cutoff for last mesagae */}
                            </div>
                        )
                    })}
                </div>

                <div className={activeChat ? 'chatTime' : 'ProfileContainer'}>
                    {activeChat ? <Chat chat={activeChat} goBack={goBack} /> :
                    <div className='ProfileContainer'>
                        <div className='flexed'>
                            <img className = 'image' 
                            src = 'https://qph.fs.quoracdn.net/main-qimg-f521020f4e9761f812d1dd8e1de32ebb-c' alt = 'Plaec'>
                            </img>
                            <button className='changeProfilePic'>Change Profile Picture</button>
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
                            <div className='horizontal'>
                                <input 
                                type = 'text'
                                name = 'city'
                                value = {city}
                                onChange = {(e) => {handleThing(e, setCity)}}
                                className='standardInput smaller'
                                required
                                placeholder='City'
                                />

                                <input 
                                type = 'text'
                                name = 'country'
                                value = {country}
                                onChange = {(e) => {handleThing(e, setCountry)}}
                                className='standardInput smaller margin-left black'
                                required
                                placeholder='Country'
                                />
                            </div>

                            <input 
                            type = 'text'
                            name = 'phone'
                            value = {facebook}
                            onChange = {(e) => {handleThing(e, setFacebook)}}
                            className='standardInput'
                            required
                            placeholder='Facebook ID'
                            />

                            <input
                            type = 'text'
                            name = 'location'
                            value = {highSchool}
                            onChange = {(e) => {handleThing(e, setHighschool)}}
                            className='standardInput'
                            required
                            placeholder='High School Name'
                            />

                            <button onClick={submitChanges}>Submit changes</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home