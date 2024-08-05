const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: Number,
    required: true,
  },
  running_time: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  imdb_rating: {
    type: Number,
    required: true,
  },
  metascore: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Movie", movieSchema, "movies");
