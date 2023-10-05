import React from 'react';
import { useNavigate } from "react-router-dom";

function MovieCard({ movie: { ID, Photo, Title, Year } }) {
  const navigate = useNavigate(); // A hook from react-router-dom to handle navigation

  // Function to handle click on the movie image
  const handleImageClick = () => {
    // Navigate to the MoviePage route and pass movie details as state
    navigate("/MoviePage", { state: { movie: { ID, Year, Photo, Title } } });
  };

  return (
    <div className="movie" key={ID}>
      <div>
        <p>{Year}</p>
      </div>
      <div>
        <img
          src={Photo}
          onClick={handleImageClick}
          alt={Title}
        />
      </div>
      <div>
        <span>{Year}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
