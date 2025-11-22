const memberService = require("../services/memberService");
const borrowingService = require("../services/borrowingService");

const createMember = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;
    const member = await memberService.createMember({ name, email, phone, address });
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

const getMemberBorrowings = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    const { status, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const result = await borrowingService.getBorrowingsByMember({
      memberId,
      status,
      page: pageNum,
      limit: limitNum,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMember,
  getMemberBorrowings,
};
