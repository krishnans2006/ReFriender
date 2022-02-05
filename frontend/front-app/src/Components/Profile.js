import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'

function Profile({}){
    return(
        <div>
            <img src = '' alt = 'Plaec'></img>
            <div>
                <h1>{}</h1>
                <h3>{}</h3>
            </div>
            <div>
                <button>Know</button>
                <button>Used To Know</button>
                <button>Don't Know</button>
            </div>
        </div>
    )
}

export default Profile