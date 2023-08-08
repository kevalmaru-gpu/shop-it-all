const { Schema, model } = require('mongoose')

const InfoSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const AddressSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }
})

const InfoModel = model('CustomerInformation', InfoSchema)
const AddressModel = model('CustomerAddress', AddressSchema)

module.exports = { InfoModel, AddressModel }