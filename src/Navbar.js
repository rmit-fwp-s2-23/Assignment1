import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./Nav.css";

function Header() { 
return (

<div className="navbar">

<div className="logo"><Link to="/">Loop Cinemas</Link></div>

    <Link to="/">Movies</Link>
    <Link to="/">Events & Festivals</Link>
    <Link to="/">Book Movies & Events</Link>
    <Link to="/">Food & Drink</Link>
    <Link to="/">Cinemas & Venues</Link>

    <div class="button-div">

    <button class="login-button">Login</button>
    
</div>
</div>
)
}

export default Header;