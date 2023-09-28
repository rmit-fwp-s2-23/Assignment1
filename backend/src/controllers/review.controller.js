const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  const review = await db.review.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const reviews = await db.review.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

  res.json(review);
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.review.create({
    movie_id: req.body.movie_id,
    user_id: req.body.user_id,
    rating: req.integer.rating,
    review: req.body.review
  });

  res.json(review);
};