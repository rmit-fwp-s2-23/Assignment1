const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.model.js")(db.sequelize, DataTypes);
db.review = require("./models/review.model.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.model.js")(db.sequelize, DataTypes);
db.booking = require("./models/booking.model.js")(db.sequelize, DataTypes);

// Relate review to user and movie.
db.review.belongsTo(db.user, { foreignKey: { name: "user_id", allowNull: false } });
db.review.belongsTo(db.movie, { foreignKey: { name: "movie_id", allowNull: false } });

// Relate booking to user
db.booking.belongsTo(db.user, {foreignKey: {name: "user_id", allowNull: false}});
db.booking.belongsTo(db.movie, {foreignKey: {name: "movie_id", allowNull: false}});

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
async function createTables() {
  try {
    await db.sequelize.sync({ force: false });
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}


createTables();


module.exports = db;
