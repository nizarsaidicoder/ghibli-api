const mongoose = require("mongoose");
// scheme for movie details

const movieDetailsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
  description: {
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
  rt_rating: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  characters: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("MovieDetails", movieDetailsSchema, "movies");
