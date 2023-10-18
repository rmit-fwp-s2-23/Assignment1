import "./login.css"; // Include 'src/' in the import path
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, setUser } from "./repository2"; // Include 'src/' in the import path

function Signup(props) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Handles input change and updates the state
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const temp = { ...fields };
    temp[name] = value;
    setFields(temp);
  };

  // Handles form submission for user signup
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validate required fields
    if (!fields.name || !fields.email || !fields.username || !fields.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate email format using a regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(fields.email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    // Validate strong password criteria
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (
      fields.password.length < 8 ||
      !specialCharPattern.test(fields.password)
    ) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one special character."
      );
      return;
    }

    // Check password confirmation
    if (fields.password !== fields.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const user = {
        username: fields.username,
        password: fields.password,
        name: fields.name,
        email: fields.email,
      };

      // Register the user
      const newUser = await createUser(user);

      // Store the newly registered user in local storage
      setUser(newUser);

      props.loginUser(fields.username);
      alert("Registration successful! You're now logged in.");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error === "Email already in use.") {
        setErrorMessage("The provided email is already registered. Please use another email.");
      } else {
        setErrorMessage("There was an error during registration. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div>
          <h1>Signup</h1>
          <hr />
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={fields.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={fields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                className="form-control"
                value={fields.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                value={fields.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="form-control"
                value={fields.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <button type="Signup" className="btn-primary" data-testid="Signup"> 
              Signup
            </button>
          </form>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
