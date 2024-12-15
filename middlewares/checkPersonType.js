const express = require("express");
const Users = require('../database/models/users');

const checkPersonType = async (req,res,next)=>{
    const Id = req.user.id;
    let personType;
    try{
        const user = await Users.findById(Id);
        if(!user){
            res.send(404,"user not found");
            return;
         }
         
         personType = user.persontype;
    }catch(error){
       // console.log("Error in checking persontype : ",error);
       res.status(500).json({ message : "Fail to check persontype (role) " , ERROR : error});
    }

    if(personType == "author"){
       next();
    }else{
       res.send(401,"Only authors can access");
    }
}

module.exports = checkPersonType;