const User = require('../models/User');
const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary')

router.post('/checkEmail',async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            res.status(200).json({
                message: "no",
            })
        }else{
            res.status(200).json({
                message: "exists",
                data: user
            })
        }
        
    } catch (error) {
        res.send(error)
    }
})


router.get('/:id', async(req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if(!user) {
            return res.status(404).json('User not found');
        }

        res.status(200).json({
            message: "success",
            data: {
                user_id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                desc: user.desc,
                designation: user.designation,
                // followers: user.followers,
                // followings: user.followings,
            }
        })
    } catch (err) {
        console.log(err);
    }
});

router.post('/profilePhoto',async(req,res)=>{
    const user = await User.findOne({_id: req.body.id});
    if(!user) {
        return res.status(404).json('User not found');
    }
    const fileStr = req.files.photo
    let imgUrl='';
    await cloudinary.uploader.upload(fileStr.tempFilePath,async(err,result)=>{
        user.profilePicture = result.url; 
        imgUrl = result.url;
    })
    await user.save()
    res.send(imgUrl)
})
module.exports = router;