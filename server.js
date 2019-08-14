// Import
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
//Config
require('./server/routes/mongoose');
app.use(express.static(__dirname + "/public/static"));
app.use(flash());
app.use(express.urlencoded({useNewUrlParser: true}));
app.use(session({
    secret: 'keepquiet',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');
//Database
require('./server/models/bear.model');
//Routes
require('./server/routes/bears.routes');
// port
app.listen(8000, () => console.log("listening on port 8000"));