import React, {useState} from 'react'

function Login({doIt}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
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

            <hr className='length'></hr>

            <button onClick={doIt} className='bigButton small'>Sign Up</button>
        </div>
    )
}

export default Login