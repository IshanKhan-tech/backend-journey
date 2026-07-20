const mongoose = require("mongoose")

const followScema = new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require: [ true, "Follower is required" ]
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require: [ true, "Followee is required" ]
    }
},{
    timestamps:true
})

const followModel = mongoose.model('follow',followScema)

module.exports = followModel