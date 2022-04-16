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
                // profile_image: user.profile_image,
                // profile_title: user.profile_title,
            }
        })
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;