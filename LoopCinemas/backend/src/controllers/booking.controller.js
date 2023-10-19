const db = require("../database");

// Retrieve all bookings.
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await db.booking.findAll();
    res.json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new booking.
exports.createBooking = async (req, res) => {
  const { movie_id, user_id, time, seat, suburb } = req.body;

  try {
    const newBooking = await db.booking.create({
      movie_id,
      user_id,
      time,
      seat,
      suburb
    });

    res.json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve a single booking by ID.
exports.getBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await db.booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error retrieving booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a booking by ID.
exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { movie_id, user_id, time, seat } = req.body;

  try {
    const booking = await db.booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update the booking data with the new values
    booking.movie_id = movie_id;
    booking.user_id = user_id;
    booking.time = time;
    booking.seat = seat;
    booking.suburb = suburb;

    // Save the updated booking data
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a booking by ID.
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const booking = await db.booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete the booking from the database
    await booking.destroy();

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
