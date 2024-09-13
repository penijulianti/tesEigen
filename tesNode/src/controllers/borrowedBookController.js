const borrowedBookModel = require("../models/borrowedBookModel");
const bookModel = require("../models/bookModel");
const memberModel = require("../models/memberModel");

const borrowBook = (req, res) => {
  const { memberCode, bookCode } = req.body;
  borrowedBookModel.borrowBook(memberCode, bookCode, (err, result) => {
    console.log(err);
    if (err) return res.status(500).json({ error: "Error borrowing book." });
    if (result.error) return res.status(400).json(result);
    return res.json({ message: "Book borrowed successfully." });
  });
};

const returnBook = (req, res) => {
  const { memberCode, bookCode } = req.body;
  borrowedBookModel.returnBook(memberCode, bookCode, (err, result) => {
    if (err) return res.status(500).json({ error: "Error returning book." });
    if (result.error) return res.status(400).json(result);
    return res.json({ message: "Book returned successfully." });
  });
};

const getAvailableBooks = (req, res) => {
  bookModel.getAvailableBooks((err, result) => {
    if (err)
      return res.status(500).json({ error: "Error fetching available books." });
    return res.json(result);
  });
};

const getMembers = (req, res) => {
  memberModel.getAllMembers((err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching members." });
    return res.json(result);
  });
};
const getBorrowedBooks = (req, res) => {
  const memberCode = req.params.memberCode;

  borrowedBookModel.getBorrowedBooksByMember(memberCode, (err, books) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for this member" });
    }
    res.status(200).json(books);
  });
};

module.exports = {
  borrowBook,
  returnBook,
  getAvailableBooks,
  getMembers,
  getBorrowedBooks,
};
