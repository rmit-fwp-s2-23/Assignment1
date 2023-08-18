import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function Content() {
    const [searchTerm, setSearchTerm] = useState("");

    const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      searchMovies(searchTerm);
    }, [searchTerm]);
  
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };

    return (

    <div className="app">
    <div className="search">
    <input
        value={searchTerm}

        onChange={(event) => setSearchTerm(event.target.value)}
         className ="placeholder" placeholder="Search for movies" /> 
    <img
        className ="./public/searchimg"
        src={"search.png"}
        alt="search"
        onClick={() => searchMovies(searchTerm)}
    />
    </div>

    {movies?.length > 0 ? (
    <div className="container">
        {movies.map((movie) => (
        <MovieCard movie={movie} />
        ))}
    </div>
    ) : (
    <div className="empty">
        <br />
        <h2>No movies found!</h2>
    </div>
    )}
    </div>
    );
};  
export default Content;
