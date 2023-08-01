const express = require('express');
const router = express.Router();
// const {getAllImages} = require('../controller/imageCtrl');
const { createEnquire, getaEnquire, getAllEnquire, reSendEmail, deleteEnquire} = require('../controller/enquireCtrl');

//route for register 
router.post("/enquire", createEnquire);
router.get("/enquire", getAllEnquire);
router.delete("/:id/enquire", deleteEnquire);
router.post("/:id/resend", reSendEmail);

module.exports = router;