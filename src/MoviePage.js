import React from 'react';
import "./MoviePage.css";
import { useLocation } from 'react-router-dom';

function MoviePage() {
  const location = useLocation();
  const { movie } = location.state;
  const movieTimings = ['6:30', '8:30', '10:30', '12:00', '14:00', '16:00', '18:00'];
  const locations = ['Southbank', '']

  return (
    <>
    <div className="movie-container">

        <div className="movie-container1">
        <img src={movie.Poster}/>
        </div>

        <div className="movie-container2"> 
        <p alt={movie.Title}>{movie.Title} - Movie Timings</p>
        </div>

        <div className="movie-container3"> 
        <p>reviews</p>
        </div>
      
    </div>
    </>
  );
}

export default MoviePage;