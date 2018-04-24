var mongoose = require('mongoose');
var Record = require('../models/record');

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
        appointment : [Record.schema]
      }]
});

var User = mongoose.model('User',userSchema);

module.exports = User;
