const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.getAllUsers = async (req, res) => {
  const user = await db.user.findAll();

  res.json(user);
};

// Select one user from the database.
exports.getUserById = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserNameById = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id, {
      attributes: ['name'] 
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.name);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  // Retrieve email and password from the request body
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  const user = await db.user.findOne({ where: { email: email } });

  if(user === null || await argon2.verify(user.password_hash, password) === false)
    // Login failed.
    res.json(null);
  else {
  res.json({
    user_id: user.user_id,
    email: user.email,
    name: user.name
  });
  }
};


// Create a user in the database.
exports.createUser = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  try {
    const user = await db.user.create({
      user_id: req.body.user_id,
      email: req.body.email,
      password_hash: hash,
      name: req.body.name,
    });

    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already in use.' });
    } else {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
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
  console.log(req.body);

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

