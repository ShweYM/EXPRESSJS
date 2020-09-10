const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    authors: [{ firstName: {type: String}, lastName: {type: String}}],
    //authors: Array,
    tags: [{ type: String}],
    pages: {type: Number, default: 0},
    published: {type: Number},
});

 // (Model Name, Schema object, Collection Name)
const model = mongoose.model('Book', schema, 'books')

module.exports = model;