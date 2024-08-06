const express = require("express");
const router = express.Router();
const Character = require("../models/Character");
const Movie = require("../models/movie");

const filter = "char_id name image movie";
// Get one character
router.get("/:id", getCharacter, (req, res) => {
  res.json(res.character);
});

// Get all characters
router.get("/", async (req, res) => {
  try {
    const nameQuery = req.query.name;
    const movieQuery = req.query.movie;
    const idQuery = req.query.id;
    const queryFilter = {};
    if (nameQuery) {
      if (nameQuery.length < 3) {
        return res
          .status(400)
          .json({ message: "Name must be at least 3 characters" });
      }
      queryFilter.name = { $regex: nameQuery, $options: "i" };
    }
    if (movieQuery) {
      queryFilter.movie = movieQuery;
    }
    if (idQuery) {
      queryFilter.char_id = idQuery;
    }
    const characters = await Character.find(queryFilter).select(filter);
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCharacter(req, res, next) {
  let character;
  try {
    character = await Character.findOne({ char_id: req.params.id }, { _id: 0 });
    if (character == null) {
      return res.status(404).json({ message: "Cannot find character" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // get movie name
  try {
    const mov = await Movie.findOne(
      { id: character.movie },
      { title: 1, _id: 0 }
    );
    res.character = {
      ...character._doc,
      movie: { id: character.movie, title: mov.title },
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
