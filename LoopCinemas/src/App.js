import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import MovieCard from './MovieCard'; 
import Content from './Content.js'; 
import Navbar from './Navbar'; 
import Login from './Login'; 
import { getUser, getAllUsers, removeUser } from './repository2';
import MoviePage from './MoviePage'; 
import Signup from './Signup'; 
import MyProfile from './MyProfile'; 
import Footer from './Footer';
import './App.css';

function App() {
  // State to hold the currently logged-in username
  
  const currentUser = getUser();
  const [username, setUsername] = useState(currentUser ? currentUser.name : null);

  console.log("Current User:", currentUser);
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
        <Route path="/MoviePage" element={<MoviePage username={username} user_id={currentUser ? currentUser.user_id : null} />} />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route
          path="/myprofile"
          element={<MyProfile userId={currentUser ? currentUser.user_id : null} logoutUser={logoutUser} />}
        />
      </Routes>

      {/* Display the footer */}
      <Footer />
    </Router>
  );
}

export default App;
