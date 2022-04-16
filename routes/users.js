const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');


// update a user
router.put('/:id', async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        
        // After setting new password, updating user
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json('You can only update your account');
    }
});


// delete a user
// router.delete('/:id', async (req, res) => {
//     if(req.body.userId === req.params.id || req.body.isAdmin) {
//         try {
//             await User.findByIdAndDelete(req.params.id);
//             res.status(200).json("Account has been deleted");
//         } catch (err) {
//             return res.status(500).json(err);
//         }
//     } else{
//         return res.status(403).json('You can only delete your account');
//     }
// })
router.delete('/:id', async (req, res) => {
    User.remove({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            message: 'Account has been deleted',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

// get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;