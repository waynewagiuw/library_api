const prisma = require("../config/database");

const findBooks = async ({ title, author, skip, take }) => {
  const where = {};
  if (title) where.title = { contains: title, mode: "insensitive" };
  if (author) where.author = { contains: author, mode: "insensitive" };

  const books = await prisma.books.findMany({
    where,
    skip,
    take,
    orderBy: { title: "asc" },
  });

  const total = await prisma.books.count({ where });

  return { books, total };
};

const updateStock = async (bookId, delta, tx) => {
  const client = tx || prisma;
  return client.books.update({
    where: { id: bookId },
    data: { stock: { increment: delta } },
  });
};

module.exports = {
  findBooks,
  updateStock,
};
