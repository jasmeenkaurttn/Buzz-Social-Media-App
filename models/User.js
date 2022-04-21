var mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    //     min: 4,
    //     max: 15,
    // },
    firstName: {
        type: String,
        required: true,
        min: 4,
        max: 15,
    },
    lastName:{
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/di4mjqigh/image/upload/v1650441396/blank-profile-picture_oof4j6.png'
    },
    coverPicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 15,
        default: "",
    },
    designation: {
        type: String,
        max: 15,
        default: "",
    },
    myWebsite: {
        type: String,
        max: 15,
        default: "",
    },
    birthday: {
        type: Date,
        // default: new Date(),
    },
    city: {
        type: String,
        max: 50,
        default: "",
    },
    stateAddress: {
        type: String,
        max: 50,
        default: "",
    },
    from: {
        type: String,
        max: 50,
        default: "",
    },
    pinCode: {
        type: Number,
        default:0
    }
    // for reset password
    // resetLink: {
    //     data: String,
    //     default: ''
    // }
},
    { timestamps: true }
);

module.exports = User = mongoose.model('userSchema', userSchema);