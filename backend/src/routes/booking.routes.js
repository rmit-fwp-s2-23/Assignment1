const express = require("express");

module.exports = (app) => {
  const controller = require("../controllers/booking.controller.js");
  const router = express.Router();

// Retrieve all bookings.
router.get('/', controller.getAllBookings);

// Create a new booking.
router.post('/', controller.createBooking);

// Retrieve a single booking by ID.
router.get('/:id', controller.getBookingById);

// Update a booking by ID.
router.put('/:id', controller.updateBooking);

// Delete a booking by ID.
router.delete('/:id', controller.deleteBooking);

  // Add routes to server.
  app.use("/api/movie", router);
};
