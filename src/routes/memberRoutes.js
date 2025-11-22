const express = require("express");
const memberController = require("../controllers/memberController");

const router = express.Router();

router.post("/members", memberController.createMember);
router.get("/members/:id/borrowings", memberController.getMemberBorrowings);

module.exports = router;
