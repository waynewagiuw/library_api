const prisma = require("../config/database");

const createMember = async (data) => {
  return prisma.members.create({ data });
};

const findMemberByEmail = async (email) => {
  return prisma.members.findUnique({ where: { email } });
};

const findMemberById = async (id) => {
  return prisma.members.findUnique({ where: { id } });
};

const countActiveBorrowings = async (memberId) => {
  return prisma.borrowings.count({
    where: { member_id: memberId, status: "BORROWED" },
  });
};

module.exports = {
  createMember,
  findMemberByEmail,
  findMemberById,
  countActiveBorrowings,
};
