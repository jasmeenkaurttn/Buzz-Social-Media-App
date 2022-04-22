const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jasmeen:jasmeen@cluster0.373uo.mongodb.net/buzzproject?retryWrites=true&w=majority')

mongoose.connection.on('error', (err) => {
    console.log('connection failed');
})
mongoose.connection.on('connected', () => {
    console.log('successfully connected to database');
})