const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    ID: Number,
    Title: String,
    Description: String,
    PageCount: Number,
    Excerpt: String,
    PublishDate: String,
});

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;
