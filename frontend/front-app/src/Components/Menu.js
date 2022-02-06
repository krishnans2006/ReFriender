import React from 'react'
import { useHistory } from 'react-router-dom'
import './menu.css'
function Menu({show, yes}){
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const history = useHistory()

    const handleLogOut = () => {
        deleteAllCookies(); 
        history.push('/'); 
    }
    const handleClick = () => {
        history.push('/')
    }
    return(
        <div className='menu' onMouseLeave = {() => {show(false)}}>
            {yes ? <h1 onClick={handleLogOut} className = 'leave'>Log Out</h1> : 
            <div>
                <div className='hbox' onClick={handleClick}>
                    <h1>Log In</h1>
                </div>
                <div className='hbox' onClick={handleClick}>
                    <h1>Sign Up</h1>
                </div>
            </div>
            }
        </div>
    )
}

export default Menu