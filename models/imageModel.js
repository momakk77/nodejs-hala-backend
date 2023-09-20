const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var imageSchema = new mongoose.Schema({
    title:{
        type: String,
        // required: true,
        // trim: true
    },
    index:{
        type: Number,
        required: true,
        // trim: true
    },
    size:{
        type: String,
        //required: true,
    },
    description:{
        type: String,
        //required: true,
    },
    category:{
        type: String,
        required: true
    },
    sizeInch:{
        type: String,
    },
    framed:{
        type: String,
    },
    imagePath:{
        type: String,
        required: true
    },
},{timestamps: true});

//Export the model
module.exports = mongoose.model('Image', imageSchema);