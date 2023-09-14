import React from 'react';
import { useNavigate } from "react-router-dom";

function MovieCard({ movie: { imdbID, Year, Poster, Title, Type } }) {
  const navigate = useNavigate(); // A hook from react-router-dom to handle navigation

  // Function to handle click on the movie image
  const handleImageClick = () => {
    // Navigate to the MoviePage route and pass movie details as state
    navigate("/MoviePage", { state: { movie: { imdbID, Year, Poster, Title, Type } } });
  };

  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>
      <div>
        {/* Displaying the movie poster */}
        <img
          src={
            Poster !== "N/A"
              ? Poster
              : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          }
          onClick={handleImageClick}
          alt={Title}
        />
      </div>
      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;
