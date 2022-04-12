const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose');
require('dotenv').config()
const dbConn = require('./config/dbConnect')
const auth_route = require('./routes/auth')
const admin_route = require('./routes/admin')
const path = require('path')
const fs = require('fs');
const morgan = require('morgan')
require('./middlewares/auth')
const passport = require('passport');
const verify_role = require('./middlewares/role')
const client_route = require('./routes/client');
const seed_route = require('./routes/seed')

// db connection
dbConn();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logger/error.log'), { flags: 'a' });

app.use(morgan('combined', {
    stream: accessLogStream
}));


app.use('/api/v1', seed_route);
// routes
app.use('/api/v1/auth', auth_route);

app.use(passport.authenticate('jwt', {session:false}));

// auth routes for clients
app.use('/api/v1/users', client_route);

//auth routes for admin
app.use('/api/v1/admin', admin_route);



// database and server connection
mongoose.connection.once('open', () => {
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`Server listening to port ${PORT}`);
    })
})

