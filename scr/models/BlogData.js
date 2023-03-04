const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    CreatedBy :{
      type: mongoose.Schema.Types.ObjectId 
    },
    blogTitle:{
        type:String
    },
    shortDescri:{
        type:String 
    },
    description:{
        type:String
    }
})
const Blog = new mongoose.model("UserBlog" , BlogSchema);
module.exports = Blog;