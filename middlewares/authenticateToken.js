const express = require("express");
const jwt = require("jsonwebtoken");

// Secret key should be kept in env file
const secretKey = "jkdgbldofehkwheldkfjl"

const authenticateToken = (req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) return res.send(403,"authentication token is required");
    
    jwt.verify(token,secretKey,(error,id)=>{
         if(error) return res.send(401,"Invalid token or token expired");
         req.user = id;
         next();
    })
}

module.exports = authenticateToken;