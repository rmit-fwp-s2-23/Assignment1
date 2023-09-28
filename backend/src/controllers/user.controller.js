const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const user = await db.user.findAll();

  res.json(user);
};

// Select one user from the database.
exports.one = async (req, res) => {
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
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    user_id: req.body.user_id,
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
  });

  res.json(user);
};
