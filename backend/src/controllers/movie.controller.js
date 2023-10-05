const db = require("../database");
const { Op } = require("sequelize");


// Retrieve all movies.
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await db.movie.findAll();
    res.json(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new movie.
exports.createMovie = async (req, res) => {
  const { image, name, year } = req.body;

  try {
    const newMovie = await db.movie.create({
      image,
      name,
      year,
    });

    res.json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a single movie by ID.
exports.getMovieByName = async (req, res) => {
  const movieName = req.params.name;

  try {
    const movies = await db.movie.findAll({
      where: {
        name: {
          [Op.like]: `%${movieName}%`
        }
      }
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    console.error("Error retrieving movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a movie by ID.
exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const { image, name, year } = req.body;

  try {
    const movie = await db.movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Update the movie data with the new values
    movie.image = image;
    movie.name = name;
    movie.year = year;

    // Save the updated movie data
    await movie.save();

    res.json(movie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a movie by ID.
exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await db.movie.findByPk(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Delete the movie from the database
    await movie.destroy();

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
