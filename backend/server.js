const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");

const app = express();

var corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:3000", "http://localhost:8081"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./src/database/config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

sequelize.sync();

// simple route
require("./src/routes/booking.routes.js")(app);
require("./src/routes/user.routes.js")(app);
require("./src/routes/review.routes.js")(app);
require("./src/routes/movie.routes.js")(app);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
