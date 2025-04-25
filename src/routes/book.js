const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const validateMongoId = require("../middleware/validateMongoId")
const checkRole = require("../middleware/checkRole")

router.get('/', bookController.getBooks);
router.post('/', bookController.createBook);
router.delete('/:id', validateMongoId('id'), checkRole('admin'), bookController.deleteBook);
router.get('/:id', validateMongoId('id'), bookController.getBookById);
router.put('/:id', validateMongoId('id'), checkRole('admin'), bookController.updateBook);

module.exports = router;

