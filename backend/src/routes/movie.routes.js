const express = require("express");

module.exports = (app) => {
  const controller = require("../controllers/movie.controller.js");
  const router = express.Router();

// Retrieve all movies.
router.get('/', controller.getAllMovies);

// Create a new movie.
router.post('/', controller.createMovie);

// Retrieve a single movie by ID.
router.get('/:id', controller.getMovieById);

// Update a movie by ID.
router.put('/:id', controller.updateMovie);

// Delete a movie by ID.
router.delete('/:id', controller.deleteMovie);

  // Add routes to server.
  app.use("/api/movie", router);
};
