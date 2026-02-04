const express= require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const connectDB= require('./connectDB');
const Books= require('./model/book.model');

dotenv.config();
connectDB();
const app= express();
const PORT= process.env.PORT || 8000;


//!Middlewares
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


//!A simple Route for getting all books
app.get('/api/books', async (req,res)=>{
    try{
        const books= await Books.find();
        res.status(200).json(books);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

app.get('/',(req,res)=>{
    res.send("Hello Guys");
})

app.use((req,res)=>{
    res.sendStatus(404);
})






app.listen(PORT, ()=>{
    console.log(`The server has started at Port ${PORT}`);
})