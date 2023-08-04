const { query } = require('express');
const Enquire = require('../models/enquireModel');
const Image = require('../models/imageModel');
const asyncHandler = require('express-async-handler');
//const slugify = require('slugify');
const nodeMailer = require('nodemailer');

// create a product
const createEnquire = asyncHandler(async (req, res) => {
    try {
        const imageId = req.body.imageId;
        const imageObj = await Image.findById(imageId);
        const imagePath = imageObj.imagePath.replace("public", "api");
        // if(req.body.title) {
        //     req.body.slug = slugify(req.body.title);
        // }
        const newEnquire = await Enquire.create({
            ...req.body,
            imagePath: imagePath,
        });
        
        console.log(imageObj);
        res.json(newEnquire);
    } catch (error) {
        throw new Error(error);
    }
});

// get a product
const getaEnquire = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findEnquire = await Enquire.findById(id);
        res.json(findEnquire);
    } catch (error) {
        throw new Error(error);
    }
});

//get all products
const getAllEnquire = asyncHandler(async (req, res) => {
    try {
        // Filter Out Products
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let queryEnquire = Enquire.find(JSON.parse(queryStr));
        

        // Limiting the fields
        const enquire = await queryEnquire;
        res.json(enquire);

        // const image = await queryImage;
        // [...image].map((img) => {
        //     img.imagePath = img.imagePath.replace("public", "api");
        //     return img;
        // });
        // res.json(image);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteEnquire = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteEnquire = await Enquire.findByIdAndDelete(id);
        res.json(deleteEnquire);
    } catch (error) {
        throw new Error(error);
    }
});

const getEnquireModel = async (id) => {
    try {
        const findEnquire = await Enquire.findById(id);
        return findEnquire;
    } catch (error) {
        throw new Error(error);
    }
}

const reSendEmail = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { id } = req.params;

    const enquire = await getEnquireModel(id);
    if (!enquire) {
        throw new Error('Could not find');
    }
    const transporter = nodeMailer.createTransport({
        // host: 'makkalkrdi7770@gmail.com',
        // port: 587,
        // secure: true,
        auth: {
            user: 'hala.alabed19@gmail.com',
            pass: 'ncauheuzuiyohphj'
        },
        service: "gmail"

    });
    console.log(enquire)
    transporter.sendMail({
        subject: `Hello we see you request image from our website`,
        to: enquire.email,
        html: `<p>${req.body.message}</p>`

    })

    res.json({ "success": true });

});





module.exports = { createEnquire, getaEnquire, getAllEnquire, reSendEmail, deleteEnquire };