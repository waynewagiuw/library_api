const bookModel = require("../models/book");

const getBooks = async ({ title, author, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const { books, total } = await bookModel.findBooks({ title, author, skip, take: limit });

  const data = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    published_year: b.published_year,
    stock: b.stock,
    isbn: b.isbn,
    available: b.stock > 0,
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
  getBooks,
};
