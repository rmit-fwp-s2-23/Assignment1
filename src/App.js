import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Content from "./Content"
import SearchIcon from "./search.svg";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
    <Navbar />
    <Content/>
    </>

  );
};

export default App;
