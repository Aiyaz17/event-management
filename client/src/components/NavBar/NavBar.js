import React from 'react'
import { Link } from 'react-router-dom';


const NavBar = () => {    
    return (
        <div className="nav d-flex justify-content-around">
            <Link className="nav-link" to="/" >Home</Link>
            <Link className="nav-link" to="/register" >Register</Link>
            <Link className="nav-link" to="/login" >Login</Link>
            <Link className="nav-link" to="/create-event" >CreateEvents</Link>
        </div>

    )
}

export default NavBar