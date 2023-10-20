import React from "react";
import { Link } from "react-router-dom";
import "./App.css";  // Import the CSS file for the main application
import "./Nav.css";  // Import the CSS file for the navigation bar styling

// Define a functional component for the navigation bar.
function Navbar() {
  return (
    <div className="navbar">
      <Link className="logo" to="/">
        {" "}
        Loop Cinemas Admin Portal{" "}
      </Link>

      {/* Links for navigating to different pages */}
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/">Bookings</Link>
      <Link to="/">Users</Link>
    </div>
  );
}

// Export the Navbar component for use in other parts of the application.
export default Navbar;