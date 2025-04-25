const Book = require("../models/bookModel");
const { body, validationResult } = require('express-validator');

const bookValidator = () => {
  return [
    body('name')
      .notEmpty().withMessage('Book name is required')
      .isString().withMessage('Book name must be a string'),

    body('author')
      .notEmpty().withMessage('Author is required')
      .isString().withMessage('Author must be a string'),

  ];
};


exports.getBooks = async (req, res) => {
  const { current = 1, pageSize = 20, name, author, category } = req.query;
  const filter = {
    ...(name && { name }),
    ...(author && { author }),
    ...(category && { category }),
  };

  const data = await Book.find(filter)
    .skip(Number(current - 1) * Number(pageSize))
    .limit(Number(pageSize))
    .populate('category');

  const total = await Book.countDocuments(filter);
  res.status(200).json({ data, total });
};

exports.createBook = [
  bookValidator(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const bookModel = new Book({ ...req.body });
    await bookModel.save();
    res.json({ success: true, code: 200 });
  }]

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ success: true });
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate('category');
  if (book) {
    res.status(200).json({ data: book, success: true });
  } else {
    res.status(500).json({ message: "The book does not exist!" });
  }
};

exports.updateBook = [
  bookValidator(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true });
  
  }]
