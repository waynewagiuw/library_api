const borrowingService = require("../services/borrowingService");

const createBorrowing = async (req, res, next) => {
  try {
    const { book_id, member_id } = req.body;
    const borrowing = await borrowingService.createBorrowing({ book_id, member_id });
    res.status(201).json(borrowing);
  } catch (err) {
    next(err);
  }
};

const returnBorrowing = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await borrowingService.returnBorrowing(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBorrowing,
  returnBorrowing,
};
