import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login({doIt}){
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*10000000000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

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

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory(); 

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginInfo = {
            email,
            password
        }
        const request = await fetch('http://localhost:5000/login', {
            mode: 'cors',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginInfo)
        })
        const result = await request.json()
        console.log(result); 
        if (result.status) {
            document.cookie = 'email='+result.result.email; 
            console.log(getCookie("email")); 
            //TODO reroute to home page if successful
            history.push("/home"); 
        }
    }

    return(
        <div className='loginCard'>
            <input 
            type = 'text'
            name = 'firstName'
            value = {email}
            onChange = {(e) => {handleThing(e, setEmail)}}
            className='standardInput'
            required
            placeholder='Email'
            />

            <input 
            type = 'password'
            name = 'firstName'
            value = {password}
            onChange = {(e) => {handleThing(e, setPassword)}}
            className='standardInput'
            required
            placeholder='Password'
            />      

            <button onClick={handleSubmit} className='bigButton small'>Log In</button>

            <button onClick={doIt} className='bigButton small'>Sign Up</button>
        </div>
    )
}

export default Login