const express = require("express");
const Movie = require("../models/movie");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    // res.status(200).json(movies);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
