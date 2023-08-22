// Signup.js
import "./login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./repository";

function Signup(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = fields.username;
    const password = fields.password;
    const registered = registerUser(username, password);

    if(registered) {
      navigate("/login");
    } else {
      setErrorMessage("Username already exists or there was an error. Please try again.");
    }
  }

  return (
    <div className="login-container">
    <div className="login-box">
        <div>
        <h1>Signup</h1>
        <hr />
        <form onSubmit={handleSignUp}>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input name="username" className="form-control" value={fields.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" value={fields.password} onChange={handleInputChange} />
            </div>
            <button type="submit">Signup</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
    </div>
    </div>
  );
}

export default Signup;
