require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const movieRouter = require("./routes/movies");
const characterRouter = require("./routes/characters");

const DBString = process.env.MONGODB_URI;
mongoose.connect(DBString);
const database = mongoose.connection;
database.on("error", (error) => console.error(error));
database.once("connected", () => console.log("Connected to database"));
app.use(cors());
app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/characters", characterRouter);
app.get("/api", (req, res) => {
  res.send("Welcome to the movie API");
});

app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
