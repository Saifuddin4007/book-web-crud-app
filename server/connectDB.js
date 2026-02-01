const mongoose= require('mongoose');
const dotenv= require('dotenv').config();

const uri= process.env.URI;

const connectDB= async()=>{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error(err);
    }
}


module.exports= connectDB;