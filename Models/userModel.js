const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    }
    
})

// model name must be plural eg: "users","projects"..etc
const users = mongoose.model("users",userSchema)
module.exports = users
