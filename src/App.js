import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCard from "./MovieCard";
import Content from "./Content"
import Navbar from "./Navbar";
import "./App.css";
import Login from "./Login";
import { getUser, removeUser } from "./repository";
import MoviePage from "./MoviePage";
import Signup from "./Signup"; 
import MyProfile from "./MyProfile";
import Footer from "./Footer"

function App() {
  const [username, setUsername] = useState(getUser());

  const loginUser = (username) => {
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }

  return (
    <Router>
      <Navbar username={username} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/MoviePage" element={<MoviePage />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/myprofile" element={<MyProfile username={username} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;