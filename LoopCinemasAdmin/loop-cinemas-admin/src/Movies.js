import React, { useState, useEffect } from "react";
import "./Movies.css";
import { addMovie, getMovies, updateMovie, deleteMovie } from "./repository.js";
import PopUp from './PopUp.js';

// Define a functional component for managing movies.
function Movies() {
  // State variables for managing movies and pop-up visibility.
  const [movies, setMovies] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [AddbuttonPopup, setAddButtonPopup] = useState(false);
  const [fields, setFields] = useState({ image: "", name: "", year: "" });
  const [editingMovie, setEditingMovie] = useState(null); // State for the currently editing movie
  const [addfields, setAddFields] = useState({ image: "", name: "", year: "" });

  // Function to handle input changes in the edit form.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Function to handle input changes in the add form.
  const handleAddChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAddFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Function to fetch all movies from the server.
  const fetchAllMovies = async () => {
    try {
      const allMovies = await getMovies();
      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching user Movies:", error);
    }
  };

  // Effect to fetch movies when the component mounts.
  useEffect(() => {
    fetchAllMovies();
  }, []);

  // Function to handle movie deletion.
  const handleDelete = (movieID) => {
    deleteMovie(movieID);
    alert("Delete successful!");
    fetchAllMovies();
  };

  // Function to initiate the movie editing process.
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setButtonPopup(true);
    setFields({
      image: movie.image,
      name: movie.name,
      year: movie.year,
    });
  };

  // Function to handle the submission of movie edits.
  const handleEditSubmit = () => {
    if (editingMovie) {
      updateMovie({
        movie_id: (editingMovie.movie_id).toString(),
        image: fields.image,
        name: fields.name,
        year: fields.year,
      });
      setEditingMovie(null);
      setButtonPopup(false);
      alert("Edit successful!");
      fetchAllMovies();
    }
  };

  // Function to handle the initiation of adding a new movie.
  const handleAdd = () => {
    setAddButtonPopup(true);
  };

  // Function to handle the submission of a new movie addition.
  const handleAddSubmit = () => {
    const yearInt = parseInt(addfields.year, 10);

    if (addfields.image && addfields.name && addfields.year) {
      addMovie({
        image: addfields.image,
        name: addfields.name,
        year: yearInt,
      });
      setAddButtonPopup(false);
      alert("Add successful!");
      fetchAllMovies();
    } else {
      alert("Please enter valid variables. An error has occurred.");
    }
  };

  // Render the movies, editing pop-up, and add pop-up.
  return (
    <div className="movie-container">
      <button className="button-style" onClick={() => handleAdd()}>
        Add Movie
      </button>

      {/* Pop-up for adding a movie */}
      <PopUp trigger={AddbuttonPopup} setTrigger={setAddButtonPopup}>
        <h2 className="edit-review-text">Please enter the movie details you want to add.</h2>
        <form onSubmit={handleAddSubmit}>
          {/* Form for adding a movie */}
          <div className="form-group">
            <label htmlFor="image" className="control-label">
              Image
            </label>
            <input
              name="image"
              id="image"
              type="text"
              value={addfields.image}
              className="form-control"
              onChange={handleAddChange}
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
              value={addfields.name}
              className="form-control"
              onChange={handleAddChange}
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
              value={addfields.year}
              className="form-control"
              onChange={handleAddChange}
            />
          </div>
          <div className="submit-add">
            <button className="button-style" type="submit" onClick={handleAddSubmit}>Add Movie</button>
          </div>
        </form>
      </PopUp>

      {/* Display movie data in a table */}
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
                <td>
                  <button
                  className="button-style"
                    onClick={() => handleDelete(movie.movie_id)}>
                    Delete Movie
                  </button>
                </td>
                <td>
                  <button  className="button-style" onClick={() => handleEdit(movie)}>
                    Edit Movie
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no movies.</p>
      )}

      {/* Pop-up for editing a movie */}
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h2 className="edit-review-text">Please Enter The Edits Required.</h2>
        <form onSubmit={handleEditSubmit}>
          {/* Form for editing a movie */}
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
            <button className="button-style" onClick={handleEditSubmit}>Submit</button>
        </form>
      </PopUp>
    </div>
  );
}

// Export the Movies component for use in other parts of the application.
export default Movies;
