const Bear = require('../models/bear.model');

exports.findBears = function(req, res){
    console.log("all bears page");
    Bear.find({}, function(err, bears) {
        if (err) {
            console.log("error");
        }
        else {
            res.render('index', {bear: bears});
        }
    });
}
exports.newBear = function(req, res) {
    console.log("new bear page");
    res.render('new_bear');
}
exports.addBear = function(req, res) {
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
}
exports.showBear = function(req, res) {
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
}
exports.editBear = function(req, res) {
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
}
exports.updateBear = function(req, res) {
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
}
exports.removeBear = function(req, res) {
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
}