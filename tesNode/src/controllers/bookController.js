const config = require("../../config/config");
const bookModel = require("../models/bookModel");

const bookController = {
  getBook: (_req, res) => {
    bookModel.getAllBook((data) => {
      res.json({
        status: 0,
        message: "sukses",
        data,
      });
    });
  },
  createBook: (req, res) => {
    const bookData = {
      code: req.body.code,
      title: req.body.title,
      author: req.body.author,
      stock: req.body.stock,
    };

    if (
      !bookData.code ||
      !bookData.title ||
      !bookData.author ||
      !bookData.stock
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    bookModel.createBook(bookData, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create book", error: err });
      }

      res
        .status(201)
        .json({ message: "Book created successfully", data: result });
    });
  },
};
module.exports = bookController;
