const Book = require("../models/books");
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
exports.bookByID = async (req, res) => {
  try {
    const bookById = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        bookById,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
exports.bookByName = async (req, res) => {
  try {
    const { name } = req.body;
    const bookByNamee = await Book.findOne({ name: name });
    res.status(200).json({
      status: "success",
      data: {
        bookByNamee,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
exports.bookByArthour = async (req, res) => {
  try {
    const { author } = req.body;
    const bookByArthour = await Book.findOne({ author: author });
    res.status(200).json({
      status: "success",
      data: {
        bookByArthour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "This route is not yet defined",
    });
  }
};
