const prisma = require("../config/database");

const createBorrowing = async (data, tx) => {
  const client = tx || prisma;
  return client.borrowings.create({ data });
};

const findBorrowingById = async (id) => {
  return prisma.borrowings.findUnique({
    where: { id },
    include: { books: true, members: true },
  });
};

const updateBorrowingReturn = async (id, tx) => {
  return tx.borrowings.update({
    where: { id },
    data: {
      status: "RETURNED",
      return_date: new Date(),
      updated_at: new Date(),
    },
  });
};

const findBorrowingsByMember = async ({
  memberId,
  status,
  skip,
  take,
}) => {
  const where = { member_id: memberId };
  if (status) where.status = status;

  const borrowings = await prisma.borrowings.findMany({
    where,
    skip,
    take,
    orderBy: { borrow_date: "desc" },
    include: { books: true },
  });

  const total = await prisma.borrowings.count({ where });

  return { borrowings, total };
};

module.exports = {
  createBorrowing,
  findBorrowingById,
  updateBorrowingReturn,
  findBorrowingsByMember,
};
