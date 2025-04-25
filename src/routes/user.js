const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateMongoId = require("../middleware/validateMongoId")
const checkRole = require("../middleware/checkRole")

router.get("/", userController.getUsers);
router.post("/", checkRole('admin'), userController.createUser);
router.delete("/:id", validateMongoId('id'), checkRole('admin'), userController.deleteUser);
router.get("/:id", validateMongoId('id'), userController.getUserById);
router.put("/:id", validateMongoId('id'), checkRole('admin'), userController.updateUser);

module.exports = router;
