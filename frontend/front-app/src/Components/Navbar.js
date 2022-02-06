import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Menu from './Menu'

import '../App.css'
import './navbar.css'

//Fetch user data in state from app or redux
//Image
//Name
//etc.
function Navbar({ loggedIn }) {
    const [cookie, setCookies] = useState('')
    const [namer, setName] = useState('')
    const [showHover, setShowHover] = useState(false)
    const [loggedIns, setLoggedIn] = useState(false)

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 10000000000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
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

    const name = 'placeholder'
    const history = useHistory()

    useEffect(() => {
        if (document.cookie.indexOf('email') != -1) {
            console.log("wtf");
            console.log(loggedIn);
            const email = getCookie('email');
            (async () => {
                const request = await fetch(`http://localhost:5000/profile/${email}`, {
                    mode: 'cors',
                })
                const data = await request.json()
                console.log(data.result.first_name)
                setName(data.result.first_name)
            })()
            setLoggedIn(true)
        }

    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.className === 'margin-left ReFriender') {
            getCookie("email") != -1 ? history.push('/home') : history.push('/')
        } else {
            history.push('/selection')
        }
    }

    return (
        <div>
            <link rel='stylesheet' href='"https://fonts.google.com/specimen/Economica?query=economica"' />
            <nav className='navbar'>
                <h1 className='margin-left ReFriender' onClick={handleClick}>ReFriender</h1>

                <h1 className='look' onClick={handleClick}>{'Look For Old Relationships!'}</h1>

                <div className='hello'>
                    <h1 onMouseEnter={() => { setShowHover(true) }}>
                        {loggedIns ? `Hello, ${namer}` : 'Sign Up / Log in'}
                    </h1>
                    {showHover ? <Menu show={() => { setShowHover(false) }} yes={loggedIns} /> : null}
                </div>
            </nav>
        </div>
    )
}

export default Navbar