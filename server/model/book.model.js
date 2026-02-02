const mongoose= require('mongoose');

const bookSchema= new mongoose.Schema({
      "title":{
            type:String,
            required:true,
      },
      "thumbnail":{
            type:String,
            required:true,
      },
      "slug":String,
      "description":String,
      "stars":String,
      "category": [String],
      "createdAt":{
            type:Date,
            default: Date.now,
      },
})

const Books= mongoose.model('Books', bookSchema);

module.exports= Books;