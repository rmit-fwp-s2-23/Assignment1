import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import "./Nav.css";

function Navbar(props) {
    return (
        <div className="navbar">
            <Link className="logo" to="/"> Loop Cinemas </Link>

            <Link to="/">Movies</Link>
            <Link to="/">Festivals</Link>
            <Link to="/">Bookings</Link>
            <Link to="/">Food & Drink</Link>

            <div className="button-div">
                {props.username ? 
                    <>
                        <Link to="/myprofile" className="username-link">{props.username}</Link>
                        <Link to="/" onClick={props.logoutUser} className="login-button">Logout</Link>
                    </>
                    :
                    <Link to="/login" className="login-button">Login</Link>
                }
            </div>
        </div>
    );
}

export default Navbar;
