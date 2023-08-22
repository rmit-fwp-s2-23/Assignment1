import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCard from "./MovieCard";
import Content from "./Content"
import SearchIcon from "./search.svg";
import Navbar from "./Navbar";
import "./App.css";
import Login from "./Login";
import { getUser, removeUser } from "./repository";
import MoviePage from "./MoviePage";

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
      </Routes>
    </Router>
  );
};

export default App;