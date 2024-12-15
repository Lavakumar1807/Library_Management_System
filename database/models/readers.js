const mongoose = require("mongoose");

const readersSchema = new mongoose.Schema({
     readername : {
        type : String,
        required : true
     },
     readeremail : {
        type : String,
        required : true
     },
     borrowedbooks : {
        type : [String],
        default : []
     }
},{timestamps : true});

const readers = mongoose.model('readers',readersSchema);

module.exports = readers;