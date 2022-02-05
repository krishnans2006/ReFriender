import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'

function Profile({}){
    const [name, setName] = useState('Michael Jackson')
    const [location, setLocation] = useState('Heheh')

    //Maybe use redux instead of usestate? *Transfers state between components easily and quickly w/store

    const handleClick = (e) => {
        e.preventDefault()
        //Send data to back-end and do something with it
        //If know send data and use that data to expiedite search? (probably too nuanced for our time frame)
        //If used to know send a match req to the home page of the used to know person
        //If dont know move on to the next in array of people?
    }

    return(
        <div className='container'>
            <img className = 'image' 
                src = 'https://qph.fs.quoracdn.net/main-qimg-f521020f4e9761f812d1dd8e1de32ebb-c' alt = 'Plaec'>
            </img>

            <div className='description'>
                <h1>{name}</h1>
                <h3>{location}</h3>
            </div>

            <div className='buttonContainer'>
                <button className='button' onClick = {handleClick}>Know</button>
                <button className='button' onClick = {handleClick}>Used To Know</button>
                <button className='button' onClick = {handleClick}>Don't Know</button>
            </div>
        </div>
    )
}

export default Profile