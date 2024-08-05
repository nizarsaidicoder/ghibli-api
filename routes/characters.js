const express = require("express");
const router = express.Router();
const Character = require("../models/Character");

// Get all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
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

module.exports = router;
