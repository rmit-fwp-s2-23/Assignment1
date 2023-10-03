import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { verifyUser, registerUser } from "./repository2";
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verify the user.
      const user = await verifyUser(fields.username, fields.password);

      // If verified login the user.
      if (user) {
        props.loginUser(fields.username);
        alert("Log in successful! You're now logged in.");

        // Navigate to the home page.
        navigate("/myprofile");
        return;
      }
    } catch (error) {
      // Set error message.
      setErrorMessage("Username and / or password invalid, please try again.");
    }
    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);
  };

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
                  <label htmlFor="username" className="control-label">
                    Username
                  </label>
                  <input
                    name="username"
                    id="username"
                    className="form-control"
                    value={fields.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="control-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={fields.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                  />
                </div>
                {errorMessage !== null && (
                  <div className="form-group">
                    <span className="text-danger">{errorMessage}</span>
                  </div>
                )}
              </form>
              <p>
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
