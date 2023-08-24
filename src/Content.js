import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import "./App.css";
import { Link } from "react-router-dom";


const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function Content() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies("Shrek");
  }, []);

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    if (searchTerm) {
        searchMovies(searchTerm);
    }}, [searchTerm]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          name="inputMovie"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="placeholder"
          placeholder="Search for movies"
        />
        <img
          className="./public/searchimg"
          src={"search.png"}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Sorry! No movies found.</h2>
        </div>
      )}
    </div>
  );
}
export default Content;
