const express = require("express");
const MovieDetailsModel = require("../models/MovieDetails");
const Movie = require("../models/movie");
const Character = require("../models/Character");
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
    return res.status(500).json({ message: err.message });
  }
  let characters = movie[0].characters.split(";");
  for (let i = 0; i < characters.length; i++) {
    const character = await getCharacter(characters[i]);
    const char = {
      char_id: character.char_id,
      name: character.name,
      age: character.age,
      specie: character.specie,
      role: character.role,
      image: character.image,
    };
    characters[i] = char;
  }
  delete movie[0]._doc._id;
  res.movie = { ...movie[0]._doc, characters: characters };
  next();
}

async function getCharacter(id) {
  try {
    let character = await Character.findOne({ char_id: id });
    if (!character) {
      return { message: "Cannot find character" };
    }
    return character;
  } catch (err) {
    return { message: err.message };
  }
}
module.exports = router;
