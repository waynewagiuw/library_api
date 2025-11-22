const prisma = require("../config/database");
const borrowingModel = require("../models/borrowing");
const bookModel = require("../models/book");
const memberModel = require("../models/member");

const createBorrowing = async ({ book_id, member_id }) => {
  if (!book_id || !member_id) {
    const err = new Error("book_id and member_id are required");
    err.statusCode = 400;
    throw err;
  }

  const book = await prisma.books.findUnique({ where: { id: book_id } });
  if (!book) {
    const err = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }
  if (book.stock <= 0) {
    const err = new Error("Book out of stock");
    err.statusCode = 400;
    throw err;
  }

  const member = await prisma.members.findUnique({ where: { id: member_id } });
  if (!member) {
    const err = new Error("Member not found");
    err.statusCode = 404;
    throw err;
  }

  const activeBorrowings = await memberModel.countActiveBorrowings(member_id);
  if (activeBorrowings >= 3) {
    const err = new Error("Member cannot borrow more than 3 books");
    err.statusCode = 400;
    throw err;
  }

  return await prisma.$transaction(async (tx) => {
    await bookModel.updateStock(book_id, -1, tx);

    const borrowing = await borrowingModel.createBorrowing(
      {
        book_id,
        member_id,
        borrow_date: new Date(),
        status: "BORROWED",
      },
      tx
    );

    return borrowing;
  });
};

const returnBorrowing = async (id) => {
  const borrowing = await borrowingModel.findBorrowingById(id);
  if (!borrowing) {
    const err = new Error("Borrowing record not found");
    err.statusCode = 404;
    throw err;
  }

  if (borrowing.status === "RETURNED") {
    const err = new Error("Book already returned");
    err.statusCode = 400;
    throw err;
  }

  return await prisma.$transaction(async (tx) => {
    await bookModel.updateStock(borrowing.book_id, +1, tx);
    const updated = await borrowingModel.updateBorrowingReturn(id, tx);
    return updated;
  });
};

const getBorrowingsByMember = async ({
  memberId,
  status,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;
  const { borrowings, total } = await borrowingModel.findBorrowingsByMember({
    memberId,
    status,
    skip,
    take: limit,
  });

  const data = borrowings.map((b) => ({
    id: b.id,
    borrow_date: b.borrow_date,
    return_date: b.return_date,
    status: b.status,
    book: {
      id: b.books.id,
      title: b.books.title,
      author: b.books.author,
      published_year: b.books.published_year,
      isbn: b.books.isbn,
    },
  }));

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

module.exports = {
  createBorrowing,
  returnBorrowing,
  getBorrowingsByMember,
};
