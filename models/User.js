var mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 15,
    },
    gender: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /([a-zA-Z0-9]+)([\_\.\-{1}])\@tothenew([\.])com/g.test(v);
        //         return '^[A-Za-z0-9._%+-]+@' + 'tothenew.com' + '$';
        //     },
        //     message: "Please enter a TTN email"
        // }
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: ''
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
    phone: {
        type: Number,
        unique: true,
        min: 10,
    },
    DOB: {
        type: Date,
        default: new Date(),
    },
    city: {
        type: String,
        max: 50,
        default: "",
    },
    from: {
        type: String,
        max: 50,
        default: "",
    },
    zip: {
        type: Number,
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