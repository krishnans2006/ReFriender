import React, {useState} from 'react'

function Signup({}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')

    const handleThing =  async (e, setter) => {
        setter(e.target.value)
    }

    return(
        <form>
            <label>First Name</label>
            <input 
            type = 'text'
            name = 'firstName'
            value = {firstName}
            onChange = {(e) => {handleThing(e, setFirstName)}}
            required
            />

            <label>Last Name</label>
            <input 
            type = 'text'
            name = 'lastName'
            value = {lastName}
            onChange = {(e) => {handleThing(e, setLastName)}}
            required
            />

            <label>Email</label>
            <input 
            type = 'text'
            name = 'email'
            value = {email}
            onChange = {(e) => {handleThing(e, setEmail)}}
            required
            />

            <label>Phone</label>
            <input 
            type = 'text'
            name = 'firstName'
            value = {phone}
            onChange = {(e) => {handleThing(e, setPhone)}}
            required
            />

            <label>Location</label>
            <input
            type = 'text'
            name = 'location'
            value = {location}
            onChange = {(e) => {handleThing(e, setLocation)}}
            required
            />
        </form>
    )
}

export default Signup