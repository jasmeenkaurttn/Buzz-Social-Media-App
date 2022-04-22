const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Post = require('../models/Post')
const { cloudinary } = require('../utils/cloudinary')

// router.post('/post',async(req,res)=>{
//     try {
//         const fileStr = req.body.data
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
//             upload_preset: 'dev-setups'
//         })
//         console.log(uploadedResponse);
//         res.json({msg: 'uploaded'})
//     } catch (error) {
//         console.log(error);
//     }
// })


//formdata
router.post('/post',async(req,res)=>{
    try {
        const fileStr = await req.files.photo;
        await cloudinary.uploader.upload(fileStr.tempFilePath,async(err,result)=>{
            const newPost = new Post({
                description: req.body.description,
                name: req.body.firstName,
                url: result.url,
                publicId:result.public_id,
                creationDate: new Date(),
                userId:req.body.userId,   
            });
            await newPost.save()
            newPost.createdAt; 
            newPost.updatedAt; 
            newPost.createdAt instanceof Date;
        })
        res.json({msg: 'uploaded'})
    } catch (error) {
        res.send(error);
    }
})


//get users posts
//json
router.get('/allPosts/:userId',async(req,res)=>{
    try {
        const posts = await Post
            .find({userId: req.params.userId})
            .sort({createdAt:-1})
            .select({description:1,url:1,creationDate:1,likes:1,comments:1})
            if (posts.length==0) {
            return res.send('No posts');
        }
        res.status(200).send(posts);
    } catch (error) {
        res.send(error);
    } 
})


//posts for the feed
//json data
router.post('/friends',async(req,res)=>{
    try {
        const friendsList = req.body.friends;
        const posts = await Post
            .find({"userId": {"$in": friendsList}})
            .sort({createdAt:-1})
            .select({description:1,url:1,creationDate:1,likes:1,comments:1})
            if (posts.length==0) 
                return res.send('No posts');
        res.status(200).send(posts);
    } catch (error) {
        res.send(error);
    } 
})



//1-image updation
//2-description updated
//3-both updated
router.put('/updatePost',async(req,res)=>{
    try {
        const post = await Post.findById(req.body.id)
        
        if(req.body.changes==1){
            //form data to sent
            const fileStr = req.files.photo
            await cloudinary.uploader.upload(fileStr.tempFilePath,async(err,result)=>{
                post.url = result.url;
                post.publicId = result.public_id    
            })
        }
        else if(req.body.changes==2){
            post.description = req.body.description
        }
        else{
            const fileStr = req.files.photo
            await cloudinary.uploader.upload(fileStr.tempFilePath,async(err,result)=>{
                post.url = result.url;
                post.publicId = result.public_id 
                post.description = req.body.description   
            })
        }
        await post.save()
        res.send("successful")
    } catch (error) {
        res.send(error);
    }
})


//formdata
//to increase like
router.put('/likes',async(req,res)=>{
    try {
        const post = await Post.findById(req.body.id)
        post.likes = post.likes+1
        await post.save()
        res.send("successful")
    } catch (error) {
        res.send(error);
    }
})

// add a comment
//json data
router.put('/comment',async(req,res)=>{
    try {
        const post = await Post.findById(req.body.id)
        var previousComments = post.comments
        var newComment = {
            name:req.body.name,
            comment:req.body.comment
        }
        post.comments.push(newComment)
        
        await post.save()
        res.send("successful")
    } catch (error) {
        res.send(error);
    }
})

//delete a post
//json data
router.delete('/deletePost',async(req,res)=>{
    try {
        await Post.findByIdAndRemove(req.body.id)
        res.send("deleted")
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;