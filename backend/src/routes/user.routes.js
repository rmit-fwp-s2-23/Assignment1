const express = require('express')

module.exports = (app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

// Create a new user.
router.post('/', controller.createUser);

// Retrieve all users.
router.get('/', controller.getAllUsers);

// Retrieve a single user by ID.
router.get('/:id', controller.getUserById);

// Update a user by ID.
router.put('/:id', controller.updateUser);

// Delete a user by ID.
router.delete('/:id', controller.deleteUser);

// Select one user from the database if username and password are a match.
router.get("/login", controller.login);

// Add routes to server.
app.use("/api/user", router);
};
