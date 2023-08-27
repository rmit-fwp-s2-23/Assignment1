import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard"; // Importing the MovieCard component
import "./App.css";
import { Link } from "react-router-dom";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function Content() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // UseEffect to fetch and set movies based on the search term
  useEffect(() => {
    if (!searchTerm) {
      searchMovies("Shrek"); // Perform the search with "Shrek" as the initial content
    } else {
      searchMovies(searchTerm); // Perform the search with the provided searchTerm
    }
  }, [searchTerm]);

  // State to hold the fetched movies
  const [movies, setMovies] = useState([]);

  // UseEffect to fetch and set movies based on the search term
  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    }
  }, [searchTerm]);

  // Function to fetch movies from the API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search); // Set the fetched movies in the state
  };

  return (
    <div className="app">
      <div className="search">
        {/* Input for searching movies */}
        <input
          name="inputMovie"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="placeholder"
          placeholder="Search for movies"
        />
        {/* Search button */}
        <img
          className="./public/searchimg"
          src={"search.png"}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {/* Rendering movies */}
      {movies ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
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
