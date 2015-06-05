var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/multitenant');

module.exports = mongoose;