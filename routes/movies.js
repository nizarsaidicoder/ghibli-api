const express = require("express");
const MovieDetailsModel = require("../models/MovieDetails");
const Movie = require("../models/movie");
const router = express.Router();
const filter =
  "id title release_date producer director synopsis imdb_rating metascore rt_rating genre poster banner trailer";
// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().select(filter);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one movie
router.get("/:id", getMovie, (req, res) => {
  res.status(200).json(res.movie);
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await MovieDetailsModel.find({ id: req.params.id });
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    switch (err.name) {
      case "CastError":
        return res.status(400).json({ message: "Invalid movie ID" });
      default:
        return res.status(500).json({ message: err.message });
    }
  }
  res.movie = movie;
  next();
}

module.exports = router;
