import React, { useState, useEffect } from "react";
import "./Movies.css";
import { getMovies, updateMovie, deleteMovie } from "./repository.js";
import EditPopUp from './EditPopUp.js'

function Movies() {
  const [movies, setMovies] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [fields, setFields] = useState({ image: "", name: "", year: "" });
  const [editingMovie, setEditingMovie] = useState(null); // State for the currently editing movie

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const allMovies = await getMovies();
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching user Movies:", error);
      }
    };
    fetchAllMovies();
  }, [movies]);

  const handleDelete = (movieID) => {
    deleteMovie(movieID);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setButtonPopup(true);
    setFields({
      image: movie.image,
      name: movie.name,
      year: movie.year,
    });
  };

  const handleEditSubmit = () => {
    if (editingMovie) {
      console.log("MOVIE ID " + editingMovie.movie_id + " NAME " + editingMovie.name + " YEAR "  + editingMovie.year)
      updateMovie({
        movie_id: (editingMovie.movie_id).toString(),
        image: fields.image,
        name: fields.name,
        year: fields.year,
      });
      // Clear the editing state and close the popup
      setEditingMovie(null);
      setButtonPopup(false);
    }
  };

  return (
    <div className="movie-container">
      {movies && movies.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>
                  <img className="movie-image" src={movie.image} alt={movie.name} />
                </td>
                <td>{movie.name}</td>
                <td>{movie.year}</td>
                <button
                  className="delete-movie-button"
                  onClick={() => handleDelete(movie.movie_id)}
                >
                  Delete Movie
                </button>
                <button className="edit-movie-button" onClick={() => handleEdit(movie)}>
                  Edit Movie
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no movies.</p>
      )}
      <EditPopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2 className="edit-review-text">Please Enter The Edits Required.</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="form-group">
            <label htmlFor="image" className="control-label">
              Image
            </label>
            <input
              name="image"
              id="image"
              type="text"
              className="form-control"
              value={fields.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="control-label">
              Name
            </label>
            <input
              name="name"
              id="name"
              type="text"
              className="form-control"
              value={fields.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year" className="control-label">
              Year
            </label>
            <input
              name="year"
              id="year"
              type="text"
              className="form-control"
              value={fields.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit-review">
            <button onClick={handleEditSubmit}>Submit</button>
          </div>
        </form>
      </EditPopUp>
    </div>
  );
}

export default Movies;
