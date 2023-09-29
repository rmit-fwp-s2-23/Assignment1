const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.getAllUsers = async (req, res) => {
  const user = await db.user.findAll();

  res.json(user);
};

// Select one user from the database.
exports.getUserById = async (req, res) => {
  const user = await db.user.findByPk(req.params.user_id);

  res.json(user);
};

// Select one user from the database if id and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.user_id);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.createUser = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    user_id: req.body.user_id,
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
  });

  res.json(user);
};

// Delete a user by ID.
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await db.user.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user from the database
    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a user by ID.
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body; // Assuming you send the updated data in the request body

  try {
    const user = await db.user.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's data with the new values, only if they are provided in the request body
    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const hash = await argon2.hash(password, { type: argon2.argon2id });
      user.password_hash = hash;
    }

    // Save the updated user data
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

