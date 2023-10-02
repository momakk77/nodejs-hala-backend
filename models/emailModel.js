const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var emailSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: false,
    },
    message:{
        type: String,
    },
},{timestamps: true});

//Export the model
module.exports = mongoose.model('Email', emailSchema);