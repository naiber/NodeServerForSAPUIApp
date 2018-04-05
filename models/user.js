var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
    name : String,
    user : String,
    password : String,
    entries : [{
        name : String,
        appointment : [{
            idOrder : Number,
            order : String,
            supplier : String,
            hours : String,
            actions : String}]}]
});

var User = mongoose.model('User',userSchema);

module.exports = User;
