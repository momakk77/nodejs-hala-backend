
const Email = require('../models/emailModel');
const asyncHandler = require('express-async-handler');
const nodeMailer = require('nodemailer');


// const createEmail = asyncHandler(async(req, res) => {
//     try{
//         // if(req.body.title) {
//         //     req.body.slug = slugify(req.body.title);
//         // }
//         const newEmail = await Email.create(req.body);
//         res.json(newEmail);
//     }catch (error) {
//         throw new Error(error);
//     }
// });

//create a user if not exists = register ctrl
const sendEmail = asyncHandler(async (req, res) => {
    console.log(req.body);
    const transporter = nodeMailer.createTransport({
        // host: 'makkalkrdi7770@gmail.com',
        // port: 587,
        // secure: true,
        auth: {
            user: 'makkalkrdi7770@gmail.com',
            pass: 'busneggsxaecybfk'
        },
        service: "gmail"

    });
    const newEmail = await Email.create(req.body);
    transporter.sendMail({

        subject: `email from: ${req.body.name}`,
        to: 'makkalkrdi7770@gmail.com',
        html: `<p>${req.body.message}</p>`
    })
    res.json({ newEmail });

});




module.exports = {
    sendEmail,
    //createEmail
};