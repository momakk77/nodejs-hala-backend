
const express = require('express');
const router = express.Router();
const {
    sendEmail,
   // createEmail
} = require('../controller/emailCtrl');
//route for register 
router.post("/send", sendEmail );

module.exports = router;