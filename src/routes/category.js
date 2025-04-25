const express = require("express");
const router = express.Router()
const categoryController = require("../controllers/catrgoryController");
const validateMongoId = require("../middleware/validateMongoId")
const checkRole = require("../middleware/checkRole")

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.delete("/:id", validateMongoId('id'), checkRole('admin'), categoryController.deleteCategory);
router.get("/:id", validateMongoId('id'), categoryController.getCategoryById);
router.put("/:id", validateMongoId('id'), checkRole('admin'), categoryController.updateCategory);

module.exports = router;
