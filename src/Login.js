import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser, registerUser } from "./repository";
import "./login.css";
import { Link } from "react-router-dom";

function Login(props) {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Create a copy of the current state.
    const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verify the user.
    const verified = verifyUser(fields.username, fields.password);

    // If verified login the user.
    if(verified === true) {
      props.loginUser(fields.username);

      // Navigate to the home page.
      navigate("/myprofile");
      return;
    }

    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    // Set error message.
    setErrorMessage("Username and / or password invalid, please try again.");
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    
    const username = event.target.signupUsername.value;
    const password = event.target.signupPassword.value;

    // Register the user.
    const registered = registerUser(username, password);

    if(registered) {
      props.loginUser(username);
      navigate("/");
    } else {
      setErrorMessage("Username already exists, please choose another one.");
    }
  
    // Reset the signup fields
    event.target.signupUsername.value = "";
    event.target.signupPassword.value = "";
  }

  return (
  <div className="login-container">
    <div className="login-box">
      <div>
        <h1>Login</h1>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="control-label">Username</label>
                <input name="username" id="username" className="form-control"
                  value={fields.username} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="control-label">Password</label>
                <input type="password" name="password" id="password" className="form-control"
                  value={fields.password} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Login" />
              </div>
              {errorMessage !== null &&
                <div className="form-group">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              }
            </form>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>  
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
}

export default Login;
