const db = require("../database");

// Retrieve all reviews.
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await db.review.findAll();
    res.json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new review.
exports.createReview = async (req, res) => {
  const { movie_id, user_id, rating, review } = req.body;

  try {
    const newReview = await db.review.create({
      movie_id,
      user_id,
      rating,
      review,
    });

    res.json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a single review by ID.
exports.getReviewById = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    console.error("Error retrieving review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a review by ID.
exports.updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { movie_id, user_id, rating, review } = req.body;

  try {
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review data with the new values
    review.movie_id = movie_id;
    review.user_id = user_id;
    review.rating = rating;
    review.review = review;

    // Save the updated review data
    await review.save();

    res.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a review by ID.
exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Delete the review from the database
    await review.destroy();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
