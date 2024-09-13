const express = require("express");
const memberController = require("../controllers/memberController");
const router = express.Router();
router.get("/member", memberController.getMember);
router.post("/member", memberController.createMember);

module.exports = router;
