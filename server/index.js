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
        const category= req.query.category;
        
        const filter={};
        if(category){
            filter.category= category;
        }
        const books= await Books.find(filter);
        res.status(200).json(books);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})



app.get('/api/books/:slug', async (req,res)=>{
    try{

        const slug= req.params.slug;
        const book= await Books.find({slug:slug});
        if(!book){
            return res.status(404).json({message:"Something went wrong. Book not found"});
        }
    
        res.status(200).json(book);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})


app.post('/api/books', async (req,res)=>{
    try{

        const {title, thumbnail, slug, description, stars, category }= req.body;
        
        if(!title || !slug || !description || !stars || !category){
            return res.json({message:"Please fill all the required fields"});
        }

        const book= await Books.create({
            title,
            slug,
            description,
            stars,
            category,
        })

        res.status(201).json({message:"Book created successfully", book:book});
    
        
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