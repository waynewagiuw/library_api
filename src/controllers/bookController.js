const bookService = require("../services/bookService");

const getBooks = async (req, res, next) => {
  try {
    const { title, author, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const result = await bookService.getBooks({
      title,
      author,
      page: pageNum,
      limit: limitNum,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
};
