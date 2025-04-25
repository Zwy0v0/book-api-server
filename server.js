const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { SECRET_KEY } = require('./src/constant')
const { expressjwt: jwt } = require("express-jwt");

const BookRouter = require("./src/routes/book")
const CategoryRoter = require("./src/routes/category")
const BorrowRouter = require("./src/routes/borrow")
const UserRouter = require("./src/routes/user")
const LoginRouter = require("./src/routes/login")
const LogoutRouter = require("./src/routes/logout")

const app = express()
dotenv.config();

//jwt 前端全部完成后记得删去, '/api/books', '/api/users', '/api/categories', '/api/borrows'
app.use(
  jwt({ secret: SECRET_KEY, algorithms: ['HS256'] })
    .unless({ path: ['/api/login'] })
);


app.use((err, req, res, next) => {
  console.log('JWT error:', err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
  next(err);
});

//Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.set('trust proxy', 'loopback'); // 


const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/server";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 10000, //// Up to 100 requests per IP
});

app.use(limiter);


//router
app.get('/', (req, res) => {
  res.json({ message: "API Running!!!" });
});

app.use('/api/books', BookRouter)
app.use('/api/categories', CategoryRoter)
app.use('/api/borrows', BorrowRouter)
app.use('/api/users', UserRouter)
app.use('/api/login', LoginRouter)
app.use('/api/logout', LogoutRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;