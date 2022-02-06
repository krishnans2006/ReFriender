import React, {useState} from 'react'

function Signup({}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [facebook, setFacebook] = useState('')
    const [highSchool, setHighschool] = useState('')
    const [middleSchool, setMiddleSchool] = useState('')
    const [password, setPassword] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const signUp = {
            firstName,
            lastName,
            email,
            facebook,
            highSchool,
            middleSchool,
            password,
            city,
            country
        }

        
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
            name = 'email'
            value = {email}
            onChange = {(e) => {handleThing(e, setEmail)}}
            className='standardInput'
            required
            placeholder='Email'
            />

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
            type = 'password'
            name = 'firstName'
            value = {password}
            onChange = {(e) => {handleThing(e, setPassword)}}
            className='standardInput'
            required
            placeholder='Password'
            />

            <button onClick={handleSubmit} className='bigButton'>Sign Up</button>
        </form>
    )
}

export default Signup