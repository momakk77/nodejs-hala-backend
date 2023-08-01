const express = require('express');

const { createImage, getaImage, getAllImages, updateImage, deleteImage, uploadImage} = require('../controller/imageCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router();

//route for create a product
router.post('/', authMiddleware, isAdmin, uploadImage, createImage);
router.get('/:id', getaImage);
router.get('/', getAllImages);
router.put('/:id',authMiddleware, isAdmin ,updateImage);
router.delete('/:id', authMiddleware, isAdmin,deleteImage);


module.exports = router;