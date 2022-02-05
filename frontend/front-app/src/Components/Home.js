import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import './Home.css'

function Home({user}){
    //Chats container maps through user.chats
    const fakeUser = {
        chats: [
            {
                name: 'po',
                messages: ['ok']
            },
            {
                name: 'po1',
                messages: ['ok']
            },
            {
                name: 'po2',
                messages: ['ok']
            }
        ]
    }
    return(
        <div>
            <Navbar />
            <div className='mainContainer'>
                <div className='chatsContainer'>
                    <h1>Chats</h1>
                    {fakeUser.chats.map((key) => {
                        return(
                            <div className='chatbox'>
                                <h2 className='name'>{key.name}</h2>
                                <h2 className='last'>{key.messages[0]}</h2>
                            </div>
                        )
                    })}
                </div>
                <div className='ProfileContainer'>
                    <h1>Profile</h1>
                </div>
            </div>
        </div>
    )
}

export default Home