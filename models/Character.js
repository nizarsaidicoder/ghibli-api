const mongoose = require("mongoose");
const characterSchema = new mongoose.Schema({
  char_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  movie: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Character", characterSchema, "characters");
