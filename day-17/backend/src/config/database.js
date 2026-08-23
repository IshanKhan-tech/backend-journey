const mongoose = require("mongoose")

const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to DB");
    }).catch(err=>{
        console.log("Error connected to db",err);
    })
}

module.exports = connectToDb