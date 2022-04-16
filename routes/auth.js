const express = require('express');
const router = express.Router();
const Joi = require('joi');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox2937e94fd4e7434bbcba182295a0b33e.mailgun.org';
const mg = mailgun({ apiKey: '9d2bcd9f5306d50f1430213db0af5481-162d1f80-2f6104e8', domain: DOMAIN });
const verifyToken = require('../middleware/verifyToken')
var User = require('../models/User');

// --- SignUp Route ----- 
router.post('/signup', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            name: req.body.name,
            gender: req.body.gender,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            desc: req.body.desc,
            designation: req.body.designation,
            phone: req.body.phone,
            DOB: req.body.DOB,
            city: req.body.city,
            from: req.body.from,
            zip: req.body.zip,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save()
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err)
    }
});


// --- Login Route ----- 
router.post('/login', verifyToken, async (req, res) => {
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
        var token = jwt.sign({
            name: user.name,
            password: user.password
        },
            'secret',
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "User Authenticated",
            token: token,
            user_id: user._id
        });

        res.status(404).json({
            message: "User not authenticated"
        })
    } catch (err) {
        console.log(err);
    }
})

// forgot-password Route
router.put('/forgot-password', async (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User with this email does not exist." })
        }

        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: '15m' });
        const data = {
            from: 'noreply@hello.com',
            to: email,
            subject: 'Reset Password Link',
            html: `
                    <h2>Please click on given link to reset your password</h2>
                    <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                `
        };

        return User.updateOne({ resetLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({ error: "reset password link error" })
            } else {
                mg.messages().send(data, function (error, body) {
                    if (error) {
                        return res.json({ error: err.message })
                    }
                    return res.json({ message: "Email has been sent, kindly follow the instructions" });
                })
            }
        })
    })
})


// Logout Route
router.put('/logout', function(req, res) {
    const authHeader = req.headers["Authorization"];
    jwt.sign(authHeader, "", {expiresIn: 1}, (logout, err) => {
        if(logout) {
            res.json({message: 'You have been logged out'});
        } else {
            res.json({ error: err.message})
        }
    })
});

module.exports = router;