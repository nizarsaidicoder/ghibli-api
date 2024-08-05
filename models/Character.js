const mongoose = require("mongoose");

// {
//     "_id": {
//       "$oid": "66b10a0861afa9379035948f"
//     },
//     "char_id": 0,
//     "name": "Nausicaä",
//     "specie": "New Human",
//     "age": 16,
//     "gender": "Female",
//     "role": "Main character",
//     "image": "https://static.wikia.nocookie.net/studio-ghibli/images/b/be/Nausicaa.jpg/revision/latest?cb=20210206143546",
//     "movie": 0
//   }
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
