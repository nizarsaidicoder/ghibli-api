const express = require("express");
const router = express.Router();
const Character = require("../models/Character");

const filter = "char_id name image movie";

// Get character based on name using ?name= query
router.get("/", async (req, res) => {
  try {
    const nameQuery = req.query.name;
    if (!nameQuery) {
      try {
        const characters = await Character.find().select(filter);
        return res.json(characters);
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else if (nameQuery.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters" });
    }
    const characters = await Character.find({
      name: { $regex: nameQuery, $options: "i" }, // 'i' for case-insensitive
    }).select(filter);
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all characters from a movie
router.get("/movie/:id", async (req, res) => {
  try {
    const characters = await Character.find({ movie: req.params.id }).select(
      filter
    );
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one character
router.get("/:id", getCharacter, (req, res) => {
  res.json(res.character);
});

async function getCharacter(req, res, next) {
  let character;
  try {
    character = await Character.find({ char_id: req.params.id });
    if (character == null) {
      return res.status(404).json({ message: "Cannot find character" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.character = character;
  next();
}
// Get all characters
router.get("/", async (req, res) => {});

module.exports = router;
