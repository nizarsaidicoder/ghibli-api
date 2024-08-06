const express = require("express");
const MovieDetailsModel = require("../models/MovieDetails");
const Movie = require("../models/movie");
const Character = require("../models/Character");
const router = express.Router();

// Get one movie
router.get("/:id", getMovie, (req, res) => {
  res.status(200).json(res.movie);
});
// Get all movies
router.get("/", async (req, res) => {
  const titleQuery = req.query.title;
  const genreQuery = req.query.genre;
  const directorQuery = req.query.director;
  const producerQuery = req.query.producer;
  const dateQuery = req.query.date;
  const queryFilter = {};
  if (titleQuery) {
    if (titleQuery.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters" });
    }
    queryFilter.title = { $regex: titleQuery, $options: "i" };
  }
  if (genreQuery) {
    queryFilter.genre = { $regex: genreQuery, $options: "i" };
  }
  if (directorQuery) {
    queryFilter.director = { $regex: directorQuery, $options: "i" };
  }
  if (producerQuery) {
    queryFilter.producer = { $regex: producerQuery, $options: "i" };
  }
  if (dateQuery) {
    queryFilter.release_date = dateQuery;
  }

  try {
    const movies = await Movie.find(queryFilter, {
      _id: 0,
      characters: 0,
      description: 0,
    });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await MovieDetailsModel.find({ id: req.params.id }, { _id: 0 });
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  let characters = movie[0].characters.split(";");
  for (let i = 0; i < characters.length; i++) {
    const character = await getCharacter(characters[i]);
    characters[i] = character;
  }
  res.movie = { ...movie[0]._doc, characters: characters };
  next();
}

async function getCharacter(id) {
  try {
    let character = await Character.findOne(
      { char_id: id },
      { _id: 0, movie: 0 }
    );
    if (!character) {
      return { message: "Cannot find character" };
    }
    return character;
  } catch (err) {
    return { message: err.message };
  }
}
module.exports = router;
