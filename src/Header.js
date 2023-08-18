import React, { useState, useEffect } from "react";
import "./App.css";
import "./Nav.css";

function Header() { 
return (

<div className="navbar">

<div className="logo" href ="/"> Loop Cinemas </div>

    <a href="/">Movies</a>
    <a href="/">Events & Festivals</a>
    <a href="/">Book Movies & Events</a>
    <a href="/">Food & Drink</a>
    <a href="/">Cinemas & Venues</a>

    <div class="button-div">

    <button class="login-button">Login</button>
    
</div>
</div>
)
}

export default Header;