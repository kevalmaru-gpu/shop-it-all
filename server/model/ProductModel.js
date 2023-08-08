const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String
    },
    price: {
        type: String
    },
    main_category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String
    },
    image: {
        type: String
    },
    no_of_ratings: {
        type: String
    }
})

const ProductModel = new model('products', ProductSchema)

module.exports = ProductModel