const mongoose = require("mongoose")

const userScema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"Username is required"],
        unique:[true,"Username must be unique"]
    },
    email:{
        type:String,
        require:[true,"Email is required"],
        unique:[true,"Email must be unique"]
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    }
})

const userModel = mongoose.model("users",userScema)

module.exports = userModel