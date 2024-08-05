const express = require("express");
const Character = require("../models/Character");
const router = express.Router();

// Get all characters
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
