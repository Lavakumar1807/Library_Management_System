const express = require("express");
const router = express.Router();
const Users = require('../database/models/users');
const Books = require('../database/models/books');
const Readers = require('../database/models/readers');

// Create a reader profile
router.post("/profile" , async (req,res)=>{
    const readerData = req.body;
    try{
        const readerEmail = readerData.readeremail;
        const readerUserProfile = await Users.findOne({ email : readerEmail});
        if(readerUserProfile.persontype == 'author'){
            res.status(400).json({ message : "authors are not allowed as a role of reader"});
            return;
        }
        if(!readerUserProfile){
           res.status(404).json({ message : "No user found . If you don't have an account please make an user account or check email "});
           return;
        }
        
        const newReader = await Readers.create(readerData);
        res.status(201).json({ message : "Reader profile created" , readerInformation : newReader});
    }catch(error){
        res.status(500).json({ message : "Fail to create reader profile " , ERROR : error});
    }
})

// Reader can borrow books
router.post("/books/borrow" , async (req,res)=>{
    const { email,bookname } = req.body;
    if(!email || !bookname){
       res.status(400).json({message : "email and bookname are required"});
       return;
    }

    try{
         const reader = await Readers.findOne({ readeremail : email});
         if(!reader){
            res.status(400).json( { message : "reader profile is not available , please create your reader profile"});
            return;
         }
         // if reader has more than 5 books then the reader is not allowed to borrow another book
         if(reader.borrowedbooks.length >= 5){
            res.status(403).json({ message : "You can borrow at max 5 books"});
            return;
         }

         const book = await Books.findOne({ title : bookname});
         if(!book || book.availableStock <= 0 ){
            res.status(404).json({ message : "The book is not available"});
            return;
         }

         // Decrement the availableStock of the book
         book.availableStock--;
         await Books.findByIdAndUpdate(book.id,{
            availableStock : book.availableStock,
         })

         // Updating borrowed books information to his profile
         reader.borrowedbooks.push(book.title);
         await Readers.findByIdAndUpdate(reader.id,{
             borrowedbooks : reader.borrowedbooks
         })

         // Also updating his user profile while borrowing
         const readerUserProfile = await Users.findOne({ email : email});
         readerUserProfile.borrowedbooks.push(book.title);

         await Users.findByIdAndUpdate(readerUserProfile.id,{
             borrowedbooks : readerUserProfile.borrowedbooks
         });
         res.status(200).json({ message : "Book borrowed successfully"});

    }catch(error){
        res.status(500).json({ message : "Fail to borrow the book" , ERROR : error});
    }
})

// Returning book
router.post("/books/return",async (req,res)=>{
    const { email , bookname } = req.body;
    if(!email || !bookname){
       res.status(400).json("email and bookname are required to return the book");
       return;
    }

    try{
         const reader = await Readers.findOne({ readeremail : email });
         if(!reader){
            res.status(400).json( { message : "reader account is not available , check your email"});
            return;
         }
         
         if(reader.borrowedbooks.indexOf(bookname) < reader.borrowedbooks.length && reader.borrowedbooks.indexOf(bookname) >=0 ){

           // Removing the book from reader borrowed books collection in the reader profile
           const index = reader.borrowedbooks.indexOf(bookname);
           reader.borrowedbooks.splice(index,1);
           await Readers.findByIdAndUpdate(reader.id,{
              borrowedbooks : reader.borrowedbooks
           })

           const readerUserProfile = await Users.findOne({ email : email});
           if(!readerUserProfile){
              res.status(400).json({ message : "No user found or check your email"});
              return;
           }

          // Removing the book from reader borrowed books collection in the user profile
           const indexOfTheBook = readerUserProfile.borrowedbooks.indexOf(bookname);
           readerUserProfile.borrowedbooks.splice(indexOfTheBook,1);
           await Users.findByIdAndUpdate(readerUserProfile.id,{
              borrowedbooks : readerUserProfile.borrowedbooks
           })
 
           // Incrementing availableStock 
           const book = await Books.findOne({ title : bookname});
           book.availableStock++;
           await Books.findByIdAndUpdate(book.id,{
              availableStock : book.availableStock
           });
           res.status(200).json({ message : "Book returned successfully"});
         }
         else{
            res.status(400).json({ message : "The book is not borrowed by you or enter valid bookname"});
         }

    }catch(error){
       res.status(500).json({ message : "Fail to return the book" , ERROR : error});
    }
})

// Get all borrowed books of a specific reader
router.get("/books/:id" ,async (req,res)=>{
    const readerId = req.params.id;
    if(!readerId){
      res.send(400,"reader id is required to get borrowed books");
      return;
    }

    try{
       const reader = await Readers.findById(readerId);
       const books = reader.borrowedbooks;
       res.status(200).json({ readerBorrowedBooks : books})
    }catch(error){
       res.send(500).json({ message : "Error in getting borrowed books of a specified reader" , ERROR : error})
    }
})

module.exports = router;