const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require('../database/models/users');
const { hashPassword,comparePasswords } = require('../hashPassword');
const authenticateToken = require("../middlewares/authenticateToken");

// This is the secret key for jwt token , should be kept in env file but for time being let it be global .
const secretKey = "jkdgbldofehkwheldkfjl";

router.get('/session/validate',authenticateToken,(req,res)=>{
    const currentTime = Math.floor(Date.now()/1000);
    if(req.user.exp < currentTime){
        res.status(403).json({ message : "Token has expired" })
    }else{
        const expireIn = req.user.exp - currentTime;
        res.status(200).json({
            message : "Token is valid",
             currentTime : currentTime ,
             expireIn : expireIn ,
             payload : req.user 
         });
    }
})

router.post("/signup",async (req,res)=>{
    const  { username,email,password,bookswritten,persontype,borrowedbooks} = req.body;

    try{
         const hashedPassword = await hashPassword(password);
         const newUser = await Users({
            username,
            email,
            password : hashedPassword,
            persontype,
            bookswritten : persontype === "author" ? bookswritten || [] : undefined,
            borrowedbooks : persontype === "reader" ? borrowedbooks || [] : undefined
         });
         await newUser.save();
         res.send(201,newUser);
    }catch(error){
       if(error.code == 11000){
           res.send(500,"Email already exists");
       }
       // console.log("Error in creating new user : ",error);
       res.status(500).json({ message : "Fail to signup user" , ERROR : error});
    }
});

router.post('/login',async (req,res)=>{
     const { email , password } = req.body;
     if(!email || !password){
        res.send(400,"email and password are required");
        return;
     }

     try{
        const user = await Users.findOne({ email });
        if(!user){
           res.send(404,"User not found");
           return;
        }

        if(comparePasswords(password,user.password)){
            const payload = {
                id : user.id
            }
            const token = jwt.sign(payload,secretKey,{expiresIn : "15d"});
            res.status(200).json({ message : "Token generated and login successfully" , token : token}); // Do not share the token
        }
        else{
           res.send(400,"wrong email or password");
        }
     }catch(error){
        // console.log("Error in logging in", error);
        res.status(500).json({ message : "Fail to login" , ERROR : error});
     }
})


router.put('/update/:id', async (req,res)=>{
    const userData = req.body;
    const id = req.params.id;
    try{
       if(userData.password){
          userData.password = await hashPassword(userData.password);
       }

       await Users.findByIdAndUpdate(id,userData);
       res.send(200,"User data updated successfully");
    }catch(error){
       // console.log("Error in updating user data : ",error);
       res.status(500).json({ message : "Fail to update user data" , ERROR : error});
    }
})


router.delete("/delete/:id" , async (req,res)=>{
    const id = req.params.id;

    try{
       await Users.findByIdAndDelete(id);
       res.send(200,"User deleted successfully");
    }catch(error){
       // console.log("Error in deleting an user : ",error);
       res.status(500).json({ message : "Fail to delete user" , ERROR : error});
    }
})


module.exports = router;