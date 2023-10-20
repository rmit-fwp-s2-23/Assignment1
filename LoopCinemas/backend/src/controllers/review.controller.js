const db = require("../database");


exports.createReview = async (req, res) => {
  const { rating, review, user_id, movie_id } = req.body;
  console.log(req.body);
  try {
    const newReview = await db.review.create({
      rating,
      review,
      user_id,
      movie_id
    });
    res.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// Retrieve reviews for a specific movie by its movie_id.
exports.getReviewByMovie = async (req, res) => {
  const movie_id = req.params.movie_id;
  const reviews = await db.review.findAll({
    where: { movie_id: movie_id}, // Query for reviews with the specified movie_id
  });

  if (!reviews || reviews.length === 0) {
    res.json([]);
  } else {
    res.json(reviews);
  }
};


// Update a review by ID.
exports.updateReview = async (req, res) => {
  const { rating, review, review_id, user_id, movie_id } = req.body; 

  try {
    const existingReview = await db.review.findByPk(review_id);

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review data with the new values
    existingReview.rating = rating;
    existingReview.review = review;
    existingReview.user_id = user_id;
    existingReview.movie_id = movie_id;

    // Save the updated review data
    await existingReview.save();

    res.json(existingReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteReview = async (req, res) => {
  const review_id = req.params.review_id;

    const review = await db.review.findByPk(review_id);

    // Delete the user from the database
    await review.destroy();

    res.json({ message: "Review deleted successfully" });
    return true;
};




