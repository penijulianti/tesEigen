const express = require("express");
const bookController = require("../controllers/bookController");
const router = express.Router();
router.get("/book", bookController.getBook);
router.post("/book", bookController.createBook);
module.exports = router;
