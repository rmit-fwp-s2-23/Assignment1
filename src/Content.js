import React, { useState, useEffect, useCallback } from "react";
import MovieCard from ".//MovieCard";
import "./App.css";
import {getMovieByName,} from "./repository2.js"

function Content() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to hold the fetched movies
  const [movies, setMovies] = useState([]);

  // Function to fetch movies from the API with debouncing
  const debouncedSearchMovies = useCallback((title) => {
    if (!title) {
      searchMovies("Home Alone")
    }
    searchMovies(title);
  }, []);

  const searchMovies = async (title) => {
    try {
      console.log("Searching for:", title);
      const response = await getMovieByName(title);
      console.log("Response:", response.title);
      setMovies(response);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

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
            <MovieCard movie={movie} key={movie.id} />
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
