const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()

const helmet = require('helmet');
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");
app.use(
  helmet({
    xPoweredBy: false,
  })
);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smart application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/room.routes')(app);
require('./routes/booking.routes')(app);

app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT;
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const closeServer = () => {
  server.close();
};

module.exports = { app, closeServer };

// const db = require("./models");
// const Role = db.role;

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "USER"
//   });

//   Role.create({
//     id: 2,
//     name: "MODERATOR"
//   });

//   Role.create({
//     id: 3,
//     name: "ADMIN"
//   });
// }