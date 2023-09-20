const Image = require('../models/imageModel');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
//const slugify = require('slugify');

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`);
    },
});

//just upload image 

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new Error('Only images are allowed'));
    }
};

const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
})


const uploadImage = upload.single('photo');
// create a product
const createImage = asyncHandler(async (req, res) => {
    try {
        // if(req.body.title) {
        //     req.body.slug = slugify(req.body.title);
        // }
        const newImage = await Image.create({
            ...req.body,
            imagePath: req.file.path,
        });
        res.json(newImage);
    } catch (error) {
        throw new Error(error);
    }
});

// get a product
const getaImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findImage = await Image.findById(id);
        findImage.imagePath = findImage.imagePath.replace("public", "api");
        const prevImage = await Image.findOne({ _id: { $lt: id } }).sort({ _id: -1 });
        const nextImage = await Image.findOne({ _id: { $gt: id } }).sort({ _id: 1 });
        res.json({
            data: findImage,
            nextImageId: nextImage?._id,
            prevImageId: prevImage?._id
        });
    } catch (error) {
        throw new Error(error);
    }
});

//get all products
const getAllImages = asyncHandler(async (req, res) => {
    try {
        // Find the first category based on "index"
        const firstCategory = await Category.findOne({}, 'category', { sort: { index: 1 } });

        if (!firstCategory) {
            // Handle the case where no category is found
            res.status(404).json({ message: "No categories found." });
            return;
        }

        // Filter Out Products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        // Update the query to filter based on the first category
        let query = Image.find({
            ...JSON.parse(queryStr),
            category: firstCategory.category,
        });

        // Sort the images based on the "index" field as a number
        query = query.sort({ index: 1 }); // 1 for ascending order, -1 for descending order

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = ((page - 1) * limit);
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const imageCount = await Image.countDocuments();
            if (skip >= imageCount) throw new Error("This Page does not exist");
        }

        const images = await query;
        images.forEach((img) => {
            img.imagePath = img.imagePath.replace("public", "api");
        });

        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});



//update a product
const updateImage = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    try {
        
      const updateImage = await Image.findByIdAndUpdate( id , req.body, {
        
        new: true,
      });
  
      res.json(updateImage);
    } catch (error) {
      throw new Error(error);
    }
  });

const deleteImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteImage = await Image.findByIdAndDelete(id);
        res.json(deleteImage);
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { createImage, getaImage, getAllImages, updateImage, deleteImage, uploadImage };