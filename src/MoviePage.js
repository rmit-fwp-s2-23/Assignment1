import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviePage() {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <div className="movie-page">
      <h1>{movie.Title}</h1>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}

export default MoviePage;