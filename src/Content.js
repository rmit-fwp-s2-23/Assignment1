import React, { useState, useEffect, useCallback } from "react";
import MovieCard from ".//MovieCard";
import "./App.css";
import {getMovieByName, getAllMovies} from "./repository2.js"

function Content() {
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to hold the fetched movies
  const [movies, setMovies] = useState([]);

  // Function to fetch movies from the API with debouncing
  const debouncedSearchMovies = useCallback(async (title) => {
    if (!title) {
      try {
        const allMoviesResponse = await getAllMovies();
        setMovies(allMoviesResponse);
      } catch (error) {
        console.error("Error fetching all movies:", error);
      }
    } else {
      searchMovies(title);
    }
  }, []);

  const searchMovies = async (title) => {
    try {
      const oneMovie = await getMovieByName(title);
      setMovies([oneMovie]); // Wrap the single movie in an array
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

      {movies ? (
        <div className="container">
          {movies.map((movie) => (
           <MovieCard movie={movie} key={movie.movie_id} />))}
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
