const mysql = require("mysql");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);

const bookModel = {
  getAllBook: (callback) => {
    db.query("SELECT * FROM book", (err, result) => {
      if (err) throw result;
      callback(result);
    });
  },
  createBook: (bookData, callback) => {
    const query = `INSERT INTO book (code_book, title, author, stock) VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [bookData.code, bookData.title, bookData.author, bookData.stock],
      callback
    );
  },
  getAvailableBooks: (callback) => {
    const query = `
      SELECT b.code, b.title, b.author, b.stock - IFNULL(borrowed.borrowedCount, 0) AS available_stock
      FROM book b
      LEFT JOIN (
        SELECT id, COUNT(*) AS borrowedCount
        FROM borrowed_books
        WHERE return_date IS NULL
        GROUP BY book_id
      ) borrowed ON b.id = borrowed.book_id
    `;
    db.query(query, callback);
  },
};
module.exports = bookModel;
