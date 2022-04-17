var mongoose = require('mongoose');
// var ObjectId = require('mongoose').ObjectId;
var User = require('./User');
const postSchema = mongoose.Schema({
    description: {
        type: String, 
        min: 4,
        max: 100,
    },
    url: {
        type: String,
        max:1000
    },
    publicId:{
        type:String
    },
    creationDate:{
        type: Date,
        required:true
    },
    likes:{
        type: Number,
        default:0 
    },
    comments:[
        {
        comment:String,
        name:String,
    }],
    createdBy:{
        type: String,
    },
    postCount:{
        type:Number
    },
    userId:{
        type:String,
        ref:'User'
    }
    // userId:[
    //     {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref:"User",
    //     }
    // ],
    },
    {timestamps:true}
);

module.exports = Post = mongoose.model('postSchema', postSchema);

