const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./src/database/db.config.js');
const route = require('./src/routes/index.routes.js');
const app = express();
require('./src/cronjobs/status-update.js');

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes config
app.use('/api/ticketing-system/v1', route)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ticketing System. In this app you can create, read, update and delete tickets for your business." });
});
app.use(function (req, res) {
  return res.status(400).send({ message: "Sorry! Route not found" });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

