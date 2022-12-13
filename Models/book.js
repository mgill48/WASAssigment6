var mongoose = require('mongoose')

var bookSchema = mongoose.Schema({
    id: String,
    Name: String,
    AuthorName: String,
    Description: String,
    BookImage: String
});

module.exports = mongoose.model("Books", bookSchema)