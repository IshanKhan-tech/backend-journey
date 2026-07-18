const mongoose = require("mongoose")

const userScema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"this username already exists"],
        require:[true,"username required"]
    },
    email:{
        type:String,
        unique:[true,"this email already exists"],
        require:[true,"email required"]
    },
    password:{
        type:String,
        require:[true,"password required"]
    },
    bio:String,
    profile_image:String
})

const userModel = mongoose.model('user',userScema)

module.exports = userModel