const mysql = require("mysql");
const config = require("../../config/config");
const memberModel = require("./memberModel");
const db = mysql.createConnection(config.db);

const borrowedBookModel = {
  borrowBook: (memberCode, bookCode, callback) => {
    // Cek apakah anggota dikenakan sanksi
    memberModel.isSanctioned(memberCode, (err, isSanctioned) => {
      if (err) return callback(err);
      if (isSanctioned)
        return callback(null, { error: "Anggota sedang dikenakan sanksi." });

      // Cek jumlah buku yang sedang dipinjam oleh anggota
      memberModel.getBorrowedCount(memberCode, (err, borrowedCount) => {
        if (err) return callback(err);
        if (borrowedCount >= 2)
          return callback(null, { error: "Anggota sudah meminjam 2 buku." });

        // Cek apakah buku sudah dipinjam oleh orang lain
        db.query(
          "SELECT * FROM borrowed_books WHERE book_code = ? AND return_date IS NULL",
          [bookCode],
          (err, result) => {
            if (err) return callback(err);
            if (result.length > 0)
              return callback(null, {
                error: "Buku sedang dipinjam oleh anggota lain.",
              });

            // Catat peminjaman buku langsung menggunakan member_code dan book_code
            const borrowDate = new Date();
            db.query(
              "INSERT INTO borrowed_books (member_code, book_code, borrow_date) VALUES (?, ?, ?)",
              [memberCode, bookCode, borrowDate],
              callback
            );
          }
        );
      });
    });
  },

  returnBook: (memberCode, bookCode, callback) => {
    // Cek apakah buku benar-benar dipinjam oleh anggota
    db.query(
      "SELECT borrow_date FROM borrowed_books WHERE member_code = ? AND book_code = ? AND return_date IS NULL",
      [memberCode, bookCode],
      (err, result) => {
        if (err) return callback(err);
        if (result.length === 0)
          return callback(null, {
            error: "Buku tidak dipinjam oleh anggota ini.",
          });

        // Hitung selisih hari antara tanggal pinjam dan tanggal pengembalian
        const borrowDate = new Date(result[0].borrow_date);
        const returnDate = new Date();
        const daysBorrowed = Math.ceil(
          (returnDate - borrowDate) / (1000 * 60 * 60 * 24)
        );

        // Jika lebih dari 7 hari, kenakan sanksi
        if (daysBorrowed > 7) {
          memberModel.updateSanctionStatus(memberCode, 1, (err) => {
            if (err) return callback(err);
          });
        }

        // Catat pengembalian buku menggunakan member_code dan book_code
        db.query(
          "UPDATE borrowed_books SET return_date = ? WHERE member_code = ? AND book_code = ?",
          [returnDate, memberCode, bookCode],
          callback
        );
      }
    );
  },
  getBorrowedBooksByMember: (memberCode, callback) => {
    const query = `
      SELECT book.code_book, book.title, book.author
      FROM borrowed_books
      INNER JOIN book ON borrowed_books.book_code = book.code_book
      WHERE borrowed_books.member_code = ? AND borrowed_books.return_date IS NULL
    `;
    db.query(query, [memberCode], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
};

module.exports = borrowedBookModel;
