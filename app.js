const express = require('express')
const mongoose = require('./conn')
var bodyparser = require('body-parser')
const logger = require('./middleware/logger');
const authentication = require('./middleware/authentication');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const profileRoute = require('./routes/profile');
const app = express(); // this represents our application

app.use(express.json()); // enable parsing up in the json objects in the body of the request
app.use(express.urlencoded({ extended: true })); // parses incoming requests with url encode payloads.  --> key=value&key=value
app.set('view engine', 'ejs');
app.use(logger);
app.use(authentication);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);

app.get('/', (req,res) => {
    res.status(200).send('Welcome to the Login and SignUp API')
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`))