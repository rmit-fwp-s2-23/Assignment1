import React, { useState, useEffect } from "react";
import "./Movies.css";
import { addMovie, getMovies, updateMovie, deleteMovie } from "./repository.js";
import PopUp from './PopUp.js';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [AddbuttonPopup, setAddButtonPopup] = useState(false);
  const [fields, setFields] = useState({ image: "", name: "", year: "" });
  const [editingMovie, setEditingMovie] = useState(null); // State for the currently editing movie
  const [addfields, setAddFields] = useState({ image: "", name: "", year: "" });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, value);

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAddChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, value);

    setAddFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const fetchAllMovies = async () => {
    try {
      const allMovies = await getMovies();
      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching user Movies:", error);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const handleDelete = (movieID) => {
    deleteMovie(movieID);
    alert("Delete successful!");
    fetchAllMovies();
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

  const handleAdd = () => {
    setAddButtonPopup(true);
  };

  const handleAddSubmit = () => {
    console.log("handleAddSubmit called");
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

  return (
    <div className="movie-container">
      <button className="add-movie-button" onClick={() => handleAdd()}>
        Add Movie
      </button>

      <PopUp trigger={AddbuttonPopup} setTrigger={setAddButtonPopup}>
        <h2 className="edit-review-text">Please enter the movie details you want to add.</h2>
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label htmlFor="image" className="control-label">
              Image
            </label>
            <input
              name="image"
              id="image"
              type="text"
              value={addfields.image} // Use addfields here
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
              value={addfields.name} // Use addfields here
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
              value={addfields.year} // Use addfields here
              className="form-control"
              onChange={handleAddChange}
            />
          </div>
          <div className="submit-add">
            <button type="submit" onClick={handleAddSubmit}>Add Movie</button>
          </div>
        </form>
      </PopUp>

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
          className="delete-movie-button"
          onClick={() => handleDelete(movie.movie_id)}
        >
          Delete Movie
        </button>
      </td>
      <td>
        <button className="edit-movie-button" onClick={() => handleEdit(movie)}>
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
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
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
      </PopUp>
    </div>
  );
}

export default Movies;
