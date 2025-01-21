const mongoose = require("mongoose"); //? mongoose
//create a schema for the DB

const bookSchema = new mongoose.Schema({
  name: {
    required: [true, "A tour must have a name"],
    type: String,
    trim: true, //remove all the white spaces in the beginning and the end
  },
  author: {
    required: [true, "A tour must have a name"],
    type: String,
    trim: true, //remove all the white spaces in the beginning and the end
  },

  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },

  summary: {
    type: String,
    trim: true, //remove all the white spaces in the beginning and the end
    required: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true, //remove all the white spaces in the beginning and the end
  },
});
//create a model inside the schema of ane DB
const Book = mongoose.model("Book", bookSchema); //? mongoose.model

module.exports = Book; //? export the model
