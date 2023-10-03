import React, { useState, useEffect } from "react";
import MovieCard from ".//MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function Content() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to hold the fetched movies
  const [movies, setMovies] = useState([]);

  // Function to fetch movies from the API with debouncing
  const debouncedSearchMovies = (title) => {
    if (!title) {
      return;
    }
    searchMovies(title);
  };

  // Function to fetch movies from the API
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search); // Set the fetched movies in the state
  };

  // UseEffect for the initial load (without debouncing)
  useEffect(() => {
    searchMovies("Shrek"); // Perform the initial search with "Shrek"
  }, []);

  // UseEffect for debounced search
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      debouncedSearchMovies(searchTerm);
    }, 150);

    return () => {
      clearTimeout(delaySearch); // Clear the timeout when the component unmounts or when searchTerm changes
    };
  }, [searchTerm]);

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
          onClick={() => debouncedSearchMovies(searchTerm)}
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
