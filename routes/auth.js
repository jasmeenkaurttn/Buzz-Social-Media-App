const express = require('express');
const router = express.Router();
const Joi = require('joi');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken')
const User = require('../models/User');

// --- SignUp Route ----- 
router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            firstName: req.body.name,
            // gender: req.body.gender,
            // profilePicture: req.body.profilePicture,
            // coverPicture: req.body.coverPicture,
            // desc: req.body.desc,
            // designation: req.body.designation,
            // phone: req.body.phone,
            // DOB: req.body.DOB,
            // city: req.body.city,
            // from: req.body.from,
            // zip: req.body.zip,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save()
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err)
    }
});


// --- Login Route ----- 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(400).json("wrong password");
        }

        // generate JWT Token
        // var token = jwt.sign({
        //     name: user.name,
        //     password: user.password
        // },
        //     'secret',
        //     { expiresIn: "1h" }
        // );

        res.send(user)

        // res.status(200).json({
        //     message: "User Authenticated",
        //     // token: token,
        //     user_id: user._id
        // });

        // res.status(404).json({
        //     message: "User not authenticated"
        // })
    } catch (err) {
        console.log(err);
    }
})

// forgot-password Route
router.put('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // front end se jo new pwd add hoga.. vo yaha update ho
    User.updateOne({email: req.body.email}, {$set: {"password": "Password entered by user in FE"}})
})


// Logout Route
// router.put('/logout', function(req, res) {
//     const authHeader = req.headers["Authorization"];
//     jwt.sign(authHeader, "", {expiresIn: 1}, (logout, err) => {
//         if(logout) {
//             res.json({message: 'You have been logged out'});
//         } else {
//             res.json({ error: err.message})
//         }
//     })
// });

module.exports = router;