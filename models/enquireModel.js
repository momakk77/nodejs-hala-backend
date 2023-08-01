const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var enquireSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    message:{
        type: String,
    },
    imageId: {
        type: String,
    },
    imagePath: {
        type: String,
    },
},{timestamps: true});

//Export the model
module.exports = mongoose.model('Enquire', enquireSchema);