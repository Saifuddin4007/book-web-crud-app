const mongoose= require('mongoose');

const bookSchema= new mongoose.Schema({
      "title":{
            type:String,
            required:true,
      },
      "thumbnail":{
            type:String,
            required:false,
      },
      "slug":String,
      "description":String,
      "stars":Number,
      "category": [String],
      "createdAt":{
            type:Date,
            default: Date.now,
      },
})

const Books= mongoose.model('Books', bookSchema);

module.exports= Books;