const express = require('express');

const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const {createCategory, getCategory, getAllCategory, deleteCategory} = require('../controller/categoryCtrl')
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;