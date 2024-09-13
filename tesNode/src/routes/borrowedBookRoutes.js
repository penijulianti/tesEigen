const express = require("express");
const router = express.Router();
const borrowedBookController = require("../controllers/borrowedBookController");

// Endpoint untuk meminjam buku
router.post("/borrow", borrowedBookController.borrowBook);

// Endpoint untuk mengembalikan buku
router.post("/return", borrowedBookController.returnBook);

// Endpoint untuk mendapatkan buku yang tersedia
router.get("/available-books", borrowedBookController.getAvailableBooks);

// Endpoint untuk mendapatkan daftar anggota
router.get("/members", borrowedBookController.getMembers);

router.get(
  "/members/:memberCode/books",
  borrowedBookController.getBorrowedBooks
);

module.exports = router;
