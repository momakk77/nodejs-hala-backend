const express = require('express');

const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const {createCategory, getCategory, getAllCategory, deleteCategory, updateCategory} = require('../controller/categoryCtrl')
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);

module.exports = router;