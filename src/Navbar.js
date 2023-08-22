import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./Nav.css";

function Header(props) {
    return (
        <div className="navbar">
            <Link className="logo" to="/"> Loop Cinemas </Link>

            <Link to="/">Movies</Link>
            <Link to="/">Events & Festivals</Link>
            <Link to="/">Book Movies & Events</Link>
            <Link to="/">Food & Drink</Link>
            <Link to="/">Cinemas & Venues</Link>

            <div className="button-div">
                {props.username ? 
                    <>
                        <span>Welcome, {props.username}</span>
                        <Link to="/" onClick={props.logoutUser} className="login-button">Logout</Link>
                    </>
                    :
                    <Link to="/login" className="login-button">Login</Link>
                }
            </div>
        </div>
    );
}

export default Header;
