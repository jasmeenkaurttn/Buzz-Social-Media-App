const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/buzzproject')

mongoose.connection.on('error', (err) => {
    console.log('connection failed');
})
mongoose.connection.on('connected', () => {
    console.log('successfully connected to database');
})