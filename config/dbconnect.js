const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Start");
    } catch(error) { 
       console.log("DataBase Error");
    }
} ;
module.exports = dbConnect;