const mongoose = require('mongoose'); // Erase if already required


var categorySchema = new mongoose.Schema({
    category:{
        type: String,
        //required: false
    },
},{timestamps: true});


module.exports = mongoose.model('Category', categorySchema);