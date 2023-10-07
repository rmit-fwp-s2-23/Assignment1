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
  const { movie_name, email, rating, review, user_id,movie_id } = req.body;

  try {
    const newReview = await db.review.create({
      movie_name,
      email,
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
  const movie_name = req.params.movie_name;
  const reviews = await db.review.findAll({
    where: { movie_name: movie_name }, // Query for reviews with the specified movie_id
  });

  if (!reviews || reviews.length === 0) {
    res.json({ message: "No reviews found for this movie" });
  } else {
    res.json(reviews);
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
// Delete a review by user ID and movie ID.
exports.deleteReview = async (req, res) => {
  const user_name = req.params.user_name; 
  const movie_name = req.params.movie_name; 

  try {
    // Find the review by both user_id and movie_id
    const review = await db.review.findOne({
      where: {
        user_name: user_name,
        movie_name: movie_name,
      },
    });

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

