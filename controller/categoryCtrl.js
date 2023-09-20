const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create({
            ...req.body,
        });
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findCategory = await Category.findById(id);
        res.json(findCategory);
    } catch (error) {
        throw new Error(error);
    }
});

//get all products
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        // Filter Out Products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let queryCategory = Category.find(JSON.parse(queryStr));
        

        // Limiting the fields
        const category = await queryCategory;
        res.json(category);

        // const image = await queryImage;
        // [...image].map((img) => {
        //     img.imagePath = img.imagePath.replace("public", "http://localhost:3001");
        //     return img;
        // });
        // res.json(image);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json(deleteCategory);
    } catch (error) {
        throw new Error(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    try {
        
      const updateCategory = await Category.findByIdAndUpdate( id , req.body, {
        
        new: true,
      });
  
      res.json(updateCategory);
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = { createCategory, getCategory, getAllCategory, deleteCategory, updateCategory};
