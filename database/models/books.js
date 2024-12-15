const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
     title : {
        type : String,
        required : true
     },
     author : {
        type : String,
        required : true
     },
     genre : {
        type : String,
        required : true 
     },
     initialStock : {
        type : Number,
        required : true
     },
     availableStock : {
        type : Number,
        required : true
     }
},{ timestamps : true });

const books = mongoose.model('books',booksSchema);

module.exports = books;

