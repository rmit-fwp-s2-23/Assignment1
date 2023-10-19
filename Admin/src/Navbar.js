import React from "react";
import { Link } from "react-router-dom";
import "/Users/ahmadal-kayyali/Assignment1-2/Admin/src/App.css"; // Include 'src/' in the import path
import "/Users/ahmadal-kayyali/Assignment1-2/Admin/src/Nav.css"; // Include 'src/' in the import path

function Navbar() {
  return (
    <div className="navbar">
      <Link className="logo" to="/">
        {" "}
        Loop Cinemas Admin Portal{" "}
      </Link>

      <Link to="/">Home</Link>
      <Link to="/">Reviews</Link>
      <Link to="/">Bookings</Link>
      <Link to="/">Users</Link>
      <Link to="/">Movies</Link>
    </div>
  );
}

export default Navbar;
