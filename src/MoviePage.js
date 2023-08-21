import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MoviePage() {
  const { imdbID } = useParams(); // Get the imdbID from the URL parameter
  const [movieInfo, setMovieInfo] = useState(null);


  useEffect(() => {
    // Assuming you have a function to fetch movie details by imdbID
    // For example: fetchMovieDetails(imdbID).then(data => setMovieInfo(data));
    // Replace this with your actual data fetching logic
  }, [imdbID]);

  return (
    <div>
      <Navbas /> {/* Include the Navbar component */}
      {movieInfo ? (
        <div>
          <h1>{movieInfo.Title}</h1>
          <p>Year: {movieInfo.Year}</p>
          <p>Type: {movieInfo.Type}</p>
          {/* Render other movie information here */}
        </div>
      ) : (
        <p>Loading movie information...</p>
      )}
    </div>
  );
}