const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    persontype : {
        type : String,
        required : true
    },
    bookswritten : {
        type : [String],
        default : undefined
    },
    borrowedbooks : {
        type : [String],
        default : undefined
    }

},{ timestamps : true});

usersSchema.pre('save', (next)=>{
    if(this.persontype  === 'reader'){
        this.bookswritten = undefined;
    }
    next();
})

usersSchema.pre('save', (next)=>{
    if(this.persontype === 'author'){
        this.borrowedbooks = undefined;
    }
    next();
})

const users = mongoose.model("users",usersSchema);

module.exports = users;