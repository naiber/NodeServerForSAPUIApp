var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = mongoose.Schema({
    name : {
              type : String,
              trim : true
            },
    user : {
              type: String,
              unique: true,
              required: true,
              trim: true
            },
    password : {
                type : String,
                required : true
              },
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
