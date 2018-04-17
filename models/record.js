var mongoose = require('mongoose');
var User = require('../models/user');

var Schema = mongoose.Schema;
var recordSchema = mongoose.Schema({
    user : {type : Schema.ObjectId, ref : 'User'},
    idOrder : Number,
    order : String,
    supplier : String,
    hours : String,
    actions : String
})

var Record = mongoose.model('Record',recordSchema);

module.exports = Record;