const express = require("express");

module.exports = (app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Create a new review.
  router.post("/", controller.createReview);

  // Retrieve reviews for a specific movie by movie_id.
  router.get("/:movie_id", controller.getReviewByMovie);

  // Update a review by ID.
  router.put("/:id", controller.updateReview);

  // Delete a review by user_id and movie_id.
  router.delete("/:review_id", controller.deleteReview);

  // Add routes to the server.
  app.use("/api/reviews", router);
};