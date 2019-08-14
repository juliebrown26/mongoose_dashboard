module.exports = app => {
    const bearController = require('../controllers/bears.controller');
        app.get('/', bearController.findBears);
        app.get('/bears/new', bearController.newBear);
        app.post('/bears', bearController.addBear);
        app.get('/bears/:id', bearController.showBear);
        app.get('/bears/edit/:id', bearController.editBear);
        app.post('/bears/:id', bearController.updateBear);
        app.post('/bears/destroy/:id', bearController.removeBear);
};