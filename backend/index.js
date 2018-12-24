const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Mongo DB CODE */
const mongoose = require('./db.js');

var driverController = require('./controllers/driverController');
var assignmentController = require('./controllers/assignmentController');
var usersRouter = require('./routes/user');

var app = express();
app.use(bodyParser.json());
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

// app.use(cors({origin:'http://127.0.0.1:4200'}));
app.listen(8080, ()=>console.log('Server started at port : 8080'));

app.use("/drivers",driverController);
app.use("/assignment",assignmentController);

//passport.js
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);


app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })

}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/users',usersRouter);