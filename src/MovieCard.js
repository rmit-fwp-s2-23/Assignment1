import React from 'react';
import { useNavigate } from "react-router-dom";

function MovieCard({ movie: { movie_id, image, name, year } }) {
  const navigate = useNavigate(); // A hook from react-router-dom to handle navigation

  // Function to handle click on the movie image
  const handleImageClick = () => {
    // Navigate to the MoviePage route and pass movie details as state
    navigate("/MoviePage", { state: { movie: { movie_id, image, name, year } } });
  };

  return (
    <div className="movie" key={movie_id}>
      <div>
        <p>{year}</p>
      </div>
      <div>
        <img
          src={image}
          onClick={handleImageClick}
          alt={name}
        />
      </div>
      <div>
        <span>{year}</span>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
