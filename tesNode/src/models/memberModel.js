const mysql = require("mysql");
const config = require("../../config/config");
const db = mysql.createConnection(config.db);

const memberModel = {
  getMember: (callback) => {
    db.query("SELECT * FROM member", (err, result) => {
      if (err) throw result;
      callback(result);
    });
  },
  createMember: (memberData, callback) => {
    const query = `INSERT INTO member (code, name) VALUES (?, ?)`;
    db.query(query, [memberData.code, memberData.name], callback);
  },
  isSanctioned: (memberCode, callback) => {
    db.query(
      "SELECT sanksi FROM member WHERE code_member = ?",
      [memberCode],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result.length > 0 && result[0].is_sanctioned);
      }
    );
  },
  getBorrowedCount: (memberCode, callback) => {
    db.query(
      "SELECT COUNT(*) AS borrowedCount FROM borrowed_books INNER JOIN member ON borrowed_books.member_code = member.code_member WHERE member.code_member = ? AND borrowed_books.return_date IS NULL",
      [memberCode],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result[0].borrowedCount);
      }
    );
  },
  updateSanctionStatus: (memberCode, status, callback) => {
    db.query(
      "UPDATE member SET is_sanctioned = ? WHERE code = ?",
      [status, memberCode],
      callback
    );
  },
};
module.exports = memberModel;
