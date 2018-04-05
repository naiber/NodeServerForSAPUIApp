var mongoose = require('mongoose');

var workSchema = mongoose.Schema({
    id : Number,
    name : String
});

var Work = mongoose.model('Work',workSchema);

module.exports = Work;
