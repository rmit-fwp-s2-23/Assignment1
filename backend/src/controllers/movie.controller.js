const db = require("../database");

// Select all movies from the database.
exports.all = async (req, res) => {
  const movie = await db.movie.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const movies = await db.movie.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(movie);
};

// Find a movie in the database.
exports.create = async (req, res) => {
    const movie = await db.movie.create({
      id: req.body.text,
      image: req.body.text,
      name: req.body.text,
      year: req.body.integer
    });
  
    res.json(movie);
  };