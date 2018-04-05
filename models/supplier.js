var mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
    id : Number,
    name : String
});

var Supplier = mongoose.model('Supplier',supplierSchema);

module.exports = Supplier;
