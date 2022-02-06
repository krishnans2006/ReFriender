import React, {useState, useEffect} from 'react'
import './Profile.css'

function Profile({}){
    const [name, setName] = useState('Michael Jackson')
    const [highSchool, setHighSchool] = useState('')
    const [middleSchool, setMiddleSchool] = useState('')
    const [potentials, setPotentials] = useState([])
    const [activePerson, setActivePerson] = useState({})
    const [yearOfBirth, setYearOfBirth] = useState(0)
    const [i, setI] = useState(0)

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

    useEffect(() => {
        //fetch data from backend
        (async () => {
            const data = await fetch(`http://localhost:5000/suggestions/${getCookie("email")}`, {
                mode: 'cors'
            })
            const request = await data.json()
            setPotentials(request.result)
        })()
    }, [])
    useEffect(() => {
        (() => {
            setActivePerson(potentials[i])
            console.log(potentials)
        })()
    }, [potentials])
    useEffect(() => {
        if(activePerson){
            (() => {
                setName(activePerson.first_name)
                setHighSchool(activePerson.high_school)
                setMiddleSchool(activePerson.middle_chool)
                setYearOfBirth(activePerson.year_of_birth)
            })()
        }
    }, activePerson)

    const nextPerson = () => {
        console.log("next"); 
        if(i !== potentials.length){
            setI((prevState) => {
                return prevState + 1
            })
            setActivePerson(potentials[i + 1])
            setName(potentials[i +1].first_name)
            setHighSchool(potentials[i+1].high_school)
            setMiddleSchool(potentials[i+1].middle_school)
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        //Send data to back-end and do something with it
        //If know send data and use that data to expiedite search? (probably too nuanced for our time frame)
        //If used to know send a match req to the home page of the used to know person
        //If dont know move on to the next in array of people?
        switch(e.target.id){
            case 'know':
                nextPerson()
                break;
            case 'used':
                (async() => {
                    const request = await fetch(`http://localhost:5000/send`, {
                        mode: 'cors',
                        body: JSON.stringify({
                            sender: getCookie('email'),
                            receiver: activePerson.email,
                            message: 'Hi, we might have known each other in the past. Want to chat?'
                        }),
                        headers: {"Content-Type": "application/json"},
                        method: 'POST'
                    })
                    const data = await request.json()
                    console.log(data)
                })()
                nextPerson()
                break;
            case 'dont':
                nextPerson()
                break;
        }
    }

    return(
        <div className='container'>
            <img className = 'image' 
                src = 'https://qph.fs.quoracdn.net/main-qimg-f521020f4e9761f812d1dd8e1de32ebb-c' alt = 'Plaec'>
            </img>

            <div className='description'>
                <h1>{name}</h1>
                <br />
                <p>High School: {highSchool}</p>
                <p>Middle School: {middleSchool}</p>
                <p>{2022 - yearOfBirth} years old</p>
            </div>

            <div className='buttonContainer'>
                <button id='know' className='button knowBtn' onClick = {handleClick}>Know</button>
                <button id='used' className='button usedToBtn' onClick = {handleClick}>Used To Know</button>
                <button id='dont' className='button dontBtn' onClick = {handleClick}>Don't Know</button>
            </div>

        </div>
    )
}

export default Profile