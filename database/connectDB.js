const mongoose = require("mongoose");

const connectDB = async (mongodburl)=>{ 
    try{
         await mongoose.connect(mongodburl);
         console.log("Database connected");

    }catch(error){
         console.log("Error in connecting with database : ",error);
    }
}

module.exports = connectDB;