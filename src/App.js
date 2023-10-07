import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import MovieCard from './MovieCard'; 
import Content from './Content.js'; 
import Navbar from './Navbar'; 
import Login from './Login'; 
import { getAllUsers, removeUser } from './repository2';
import MoviePage from './MoviePage'; 
import Signup from './Signup'; 
import MyProfile from './MyProfile'; 
import Footer from './Footer';
import './App.css';

function App() {
  // State to hold the currently logged-in username
  const [username, setUsername] = useState(getAllUsers());

  // Function to set the logged-in username
  const loginUser = (username) => {
    setUsername(username);
  };

  // Function to log out the user
  const logoutUser = () => {
    removeUser(); // Removing user data from storage
    setUsername(null); // Clearing the username state
  };

  return (
    <Router>
      {/* Display the navigation bar with username and logout functionality */}
      <Navbar username={username} logoutUser={logoutUser} />

      {/* Define the routes for different pages */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/MoviePage" element={<MoviePage username={username} />} />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route
          path="/myprofile"
          element={<MyProfile username={username} logoutUser={logoutUser} />}
        />
      </Routes>

      {/* Display the footer */}
      <Footer />
    </Router>
  );
}

export default App;
