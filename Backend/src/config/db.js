const mongoose=require("mongoose");

const connectDB = async()=>{
     
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to the DB successfully")
     
}

module.exports=connectDB;