const express = require("express");
const Users = require('../database/models/users');
const Books = require('../database/models/books');
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkPersonType = require("../middlewares/checkPersonType");

// Get all books in the library
router.get('/' , async (req,res)=>{
    try{
         const allBooks = await Books.find({});
         if(allBooks.length!=0){
            res.send(allBooks);
         }
         else{
            res.send(200,"No book is available in the library");
         }
    }catch(error){
        // console.log("Error in getting books information : ",error);
        res.status(500).json({ message : "Fail to search books" , ERROR : error});
    }
})

// Create a new book and add to library system , only for authors
router.post('/create',authenticateToken,checkPersonType ,async (req,res)=>{
    const bookInformation = req.body;
    const authorId = req.user.id;
    if(bookInformation.initialStock != bookInformation.availableStock){
       res.status(400).json({ message : "Both initialStock and availableStock should be same"});
       return;
    }
    try{
      const newBook = await Books.create(bookInformation);
      const author = await Users.findById(authorId);
      author.bookswritten.push(newBook.title);

      await Users.findByIdAndUpdate(authorId,{
         bookswritten : author.bookswritten
      });

      res.status(200).json({ message : "new book created" , book : newBook})
    }catch(error){
      // console.log("Error in creating new book : ",error);
      res.status(500).json({ message : "Fail", ERROR : error});
    }
});

// Get books created by the author and get details of borrowed books , only for authors
router.get("/author/:id" ,authenticateToken,checkPersonType,async (req,res)=>{
    const authorId = req.params.id;
    if(!authorId){
       res.status(400).json({ message : "author id is required"});
       return;
    }

    try{
         const author = await Users.findById(authorId);
         const authorBooks = await Books.find({ author : author.username});

         const borrowedBooks = authorBooks.filter((book)=>{
            return book.initialStock > book.availableStock
         })

         res.status(200).json({ bookswritten : author.bookswritten , borrowedBooks : borrowedBooks});
    }catch(error){
       res.status(500).json({ message : "Error in retrieving author books", ERROR : error});
    }
});

// Update book content and information
router.put("/update/:id" , authenticateToken , checkPersonType , async (req,res)=>{
    const bookId = req.params.id;
    if(!bookId){
       res.send(400,"Book id id required to update");
       return;
    }

    try{ 
       const updatedBookInformation = req.body;
       const bookDetails = await Books.findById(bookId);

       const author = await Users.findById(req.user.id);
       if(bookDetails.author != author.username){
         res.status(403).json({ message : "Only book author can update the book information "});
         return;
       } 

       const bookInformation = await Books.findByIdAndUpdate(bookId,updatedBookInformation ,{new :true});
       res.status(200).json({ message : "Book infomation updated successfully" , bookInformation : bookInformation});

    }catch(error){
        res.status(500).json({ message : "Fail to update book information" , ERROR : error });
    }
})

// delete the book
router.delete('/delete/:id',authenticateToken , checkPersonType ,async (req,res)=>{
    const bookId = req.params.id;
    if(!bookId){
       res.send(400,"Book id is required to delete");
       return;
    }

    try{
        const bookDetails = await Books.findById(bookId);

        const author = await Users.findById(req.user.id);
        if(bookDetails.author != author.username){
          res.status(403).json({ message : "Only book author can delete the book"});
          return;
        } 
 
         await Books.findByIdAndDelete(bookId);
         res.send(200,"Book deleted successfully");
    }catch(error){
       res.status(500).json({ message : "Fail" , ERROR : error });
    }
})


module.exports = router;