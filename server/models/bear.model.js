const mongoose = require('mongoose');

const BearSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    type: { type: String, required: true, minlength: 4},
    home_state: { type: String, required: true, length: 2},
}, {timestamps: true });

module.exports = mongoose.model('Bear', BearSchema);