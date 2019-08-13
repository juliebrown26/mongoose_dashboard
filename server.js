// Import
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
mongoose.connect('mongodb://localhost:27017/bears', {useNewUrlParser: true});

//Config
app.use(express.static(__dirname + "/views"));
app.use(flash());
app.use(express.urlencoded({useNewUrlParser: true}));
app.use(session({
    secret: 'keepquiet',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Database
const BearSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    type: { type: String, required: true, minlength: 4},
    home_state: { type: String, required: true, length: 2},
}, {timestamps: true });

const Bear = mongoose.model('Bear', BearSchema);

//Routes
app.get('/', (req, res) => {
    console.log("all bears page");
    Bear.find({}, function(err, bears) {
        if (err) {
            console.log("error");
        }
        else {
            res.render('index', {bear: bears});
        }
    });
});
app.get('/bears/new', function(req, res) {
    console.log("new bear page");
    res.render('new_bear');
});
app.post('/bears', (req, res) => {
    console.log('new_bear');
    const bear = new Bear();
    bear.name = req.body.name;
    bear.type = req.body.type;
    bear.home_state = req.body.home_state;
    bear.save(function(err, data) {
        if (err) {
            console.log("something went wrong");
            for(var key in err.errors){
                req.flash("bearform", err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log("new bear added");
            console.log(bear._id)
            res.redirect(`/bears/${bear._id}`);
        };
    });
});
app.get('/bears/:id', function(req, res) {
    console.log("one bear page");
    Bear.findOne({_id: req.params.id}, function(err, bear) {
        if (err) {
            console.log("error, cant find bear");
        }
        else {
            res.render('one_bear', {bear: bear});
            console.log(bear.name);
        }
    });
});
app.get('/bears/edit/:id', function(req, res) {
    console.log("edit bear page");
    Bear.findOne({_id: req.params.id}, function(err, bear) {
        if (err) {
            console.log("error, cant find bear");
        }
        else {
            res.render('edit_bear', {bear: bear});    
            console.log(bear._id);
        }
    });
    
});
app.post('/bears/:id', function(req, res) {
    console.log('editing bear');
    Bear.findOne({_id: req.params.id}, function(err, bear) {
        if (err) {
            console.log("error, cant find bear");
        }
        else {
            Bear.updateOne({_id: bear.id}, {
                name: req.body.name,
                type: req.body.type,
                home_state: req.body.home_state,
            })
                .then(result => {
                    console.log("bear updated");
                    res.redirect(`/bears/${req.params.id}`)
                })
                .catch(err => res.json(err));
        };
    });
});
app.post('/bears/destroy/:id', (req, res) => {
    console.log("removing bear");
    Bear.findOne({_id: req.params.id}, function(err, bear) {
        if (err) {
            console.log("error, cant find bear");
        }
        else {
            Bear.remove({_id: bear.id}, function(err, bear) {
                if (err) {
                    console.log("error, cant remove bear");
                }
                else {
                    res.redirect('/')
                }
            }); 
        }
    });
});

// port
app.listen(8000, () => console.log("listening on port 8000"));