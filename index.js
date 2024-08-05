require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const movieRouter = require("./routes/movie");
const Movie = require("./models/movie");

const DBString = process.env.DATABASE_URL;
mongoose.connect(DBString);

const database = mongoose.connection;
database.on("error", (error) => console.error(error));
database.once("connected", () => console.log("Connected to database"));

app.use(express.json());
app.use("/movies", movieRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
