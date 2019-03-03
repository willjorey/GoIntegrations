const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: String,
    title: String,
    image: String,
    price: Number,
})

module.exports = mongoose.model('Product', productSchema);