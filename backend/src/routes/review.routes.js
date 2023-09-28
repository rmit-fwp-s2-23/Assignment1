const express = require("express");

module.exports = (app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();


// Retrieve all reviews.
router.get('/', controller.getAllReviews);

// Create a new review.
router.post('/', controller.createReview);

// Retrieve a single review by ID.
router.get('/:id', controller.getReviewById);

// Update a review by ID.
router.put('/:id', controller.updateReview);

// Delete a review by ID.
router.delete('/:id', controller.deleteReview);

  // Add routes to server.
  app.use("/api/review", router);
};
