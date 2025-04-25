const Book = require("../models/bookModel");
const Borrow = require("../models/borrowModel");

// user can only get his own borrowing records, admin can get all borrowing records.
exports.getBorrows = async (req, res) => {
  const { current = 1, pageSize = 20, book, user, status } = req.query;

  const jwtUser = req.auth;

  let newUser = user;
  if (jwtUser && jwtUser.role === 'user') {
    newUser = jwtUser.id;
  }

  const query = {
    ...(book && { book }),
    ...(newUser && { user: newUser }),
    ...(status && { status }),
  };

  const total = await Borrow.countDocuments(query);
  const data = await Borrow.find(query)
    .sort({ updatedAt: -1 })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize))
    .populate(['user', 'book']);

  res.status(200).json({ success: true, data, total });
};

// borrow
exports.borrowBook = async (req, res) => {
  const { book, user } = req.body;
  const borrow = new Borrow(req.body);

  const bookData = await Book.findOne({ _id: book });

  if (bookData) {
    if (bookData.stock > 0) {
      await borrow.save();
      await Book.findByIdAndUpdate(bookData._id, { stock: bookData.stock - 1 });
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ message: 'Insufficient stock of books!' });
    }
  } else {
    res.status(500).json({ message: 'The book does not exist' });
  }
};

// 获取单个借阅记录
exports.getSingleBorrow = async (req, res) => {
  const data = await Borrow.findOne({ _id: req.params.id });
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(500).json({ message: 'This loan record does not exist' });
  }
};

// 删除借阅记录
exports.deleteBorrow = async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);
  if (borrow) {
    await Borrow.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: 'This loan record does not exist' });
  }
};

// 书籍归还
exports.returnBook = async (req, res) => {
  const borrow = await Borrow.findOne({ _id: req.params.id });

  if (borrow) {
    if (borrow.status === 'off') {
      res.status(500).json({ message: 'Current books have been returned' });
    } else {
      borrow.status = 'off';
      borrow.backAt = Date.now();
      await borrow.save();

      const book = await Book.findOne({ _id: borrow.book });

      if (book) {
        book.stock += 1;
        await book.save();
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ message: 'The book does not exist' });
      }
    }
  } else {
    res.status(500).json({ message: 'This loan record does not exist' });
  }
};
