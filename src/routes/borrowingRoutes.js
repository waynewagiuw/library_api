const express = require("express");
const borrowingController = require("../controllers/borrowingController");

const router = express.Router();

router.post("/borrowings", borrowingController.createBorrowing);
router.put("/borrowings/:id/return", borrowingController.returnBorrowing);

module.exports = router;
