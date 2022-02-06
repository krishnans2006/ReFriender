import React, {useState} from 'react'

function Signup({doIt}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [facebook, setFacebook] = useState('')
    const [highSchool, setHighschool] = useState('')
    const [middleSchool, setMiddleSchool] = useState('')
    const [password, setPassword] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [yearOfBirth, setYearOfBirth] = useState('')

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const signUp = {
            firstName,
            lastName,
            email,
            highSchool,
            middleSchool,
            password,
            zipCode, 
            yearOfBirth
        }
        const request = await fetch('http://localhost:5000/register', {
            mode: 'cors',
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signUp)
        })
        const result = await request.json()
        console.log(result)
    }

    return(
        <form className='signUp'>
            <h1 className="header-one full-width text-center">Sign Up</h1>
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
            name = 'email'
            value = {email}
            onChange = {(e) => {handleThing(e, setEmail)}}
            className='standardInput'
            required
            placeholder='Email'
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

            <input
            type = 'text'
            name = 'location'
            value = {middleSchool}
            onChange = {(e) => {handleThing(e, setMiddleSchool)}}
            className='standardInput'
            required
            placeholder='Middle School Name'
            />

            <input
            type = 'text'
            name = 'location'
            value = {yearOfBirth}
            onChange = {(e) => {handleThing(e, setYearOfBirth)}}
            className='standardInput'
            required
            placeholder='Year Of Birth *23/6/2006'
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

            <button onClick={handleSubmit} className='bigButton'>Sign Up</button>

            <button onClick={doIt} className='bigButton small'>Log In</button>
        </form>
    )
}

export default Signup