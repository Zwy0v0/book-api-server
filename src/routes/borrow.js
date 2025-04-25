const express = require("express");
const router = express.Router()
const borrowController = require("../controllers/borrowController");
const validateMongoId = require("../middleware/validateMongoId")
const checkRole = require("../middleware/checkRole")


router.get('/', borrowController.getBorrows);
router.post('/', checkRole('admin'), borrowController.borrowBook);
router.get('/:id', validateMongoId('id'), borrowController.getSingleBorrow);
router.delete('/:id', validateMongoId('id'), checkRole('admin'), borrowController.deleteBorrow);
router.put('/back/:id', validateMongoId('id'), borrowController.returnBook);

module.exports = router;