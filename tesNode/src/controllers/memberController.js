const config = require("../../config/config");
const bookModel = require("../models/bookModel");
const memberModel = require("../models/memberModel");

const memberController = {
  getMember: (_req, res) => {
    memberModel.getMember((data) => {
      res.json({
        status: 0,
        message: "sukses",
        data,
      });
    });
  },
  createMember: (req, res) => {
    const memberData = {
      code: req.body.code,
      name: req.body.name,
    };

    if (!memberData.code || !memberData.name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    memberModel.createMember(memberData, (err, result) => {
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
module.exports = memberController;
