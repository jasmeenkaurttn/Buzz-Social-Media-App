const User = require('../models/User');
const router = require('express').Router();

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

module.exports = router;