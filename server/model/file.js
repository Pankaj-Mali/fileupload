const mongoose= require("mongoose");

const Schema= mongoose.Schema

const postSchema= new Schema({
    file:{type:String , required: true },
    user:{type:Schema.Types.ObjectId , ref:"User", required: true}
})

const post= mongoose. model("Post" , postSchema);

module.exports = post;