const { Schema, model } = require('mongoose')

const CartSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        require: true,
        min: 1,
        max: 100
    },
    is_bought: {
        type: Boolean,
        required: true
    }
})

module.exports = model('cart', CartSchema)