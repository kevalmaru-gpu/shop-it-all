const { InfoModel, AddressModel } = require('../model/UserModel')
const { hash, compare } = require('bcrypt')
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId

const SALT_ROUNDS = 2

async function _register_user(req, res){
    const data = req.body
    const saltrounds = 2

    // * generating hashq
    hash(data.password, saltrounds, async function(err, hash){
        data.password = hash
        const info_model = new InfoModel(data)

        // * storing updated data to db 
        await info_model.save()
        .then((result, err) => {
            if (err) res.status(400).json({ status: 'failed', body: err})
            res.status(201).json({ status: 'success', body: result})
        })
        .catch(err => res.status(400).json({ status: 'failed', body: err}))
    })
}

async function _register_address(req, res){
    const data = req.body
    const address_model = new AddressModel(data)

    await address_model.save()
    .then((result, err) => {
        if (err) res.status(400).json({ status: 'failed', body: err})
        res.status(201).json({ status: 'success', body: result})
    })
    .catch(err => res.status(400).json({ status: 'failed', body: err }))
}

async function _login_customer(req, res){
    const data = req.body
    await InfoModel.findOne({
        username: data.username
    })
    .then(function(result, err){
        if (err) res.status(400).json({status: 'failed', body: err})
        compare(data.password, result.password, function(hashErr, isValid){
            if (hashErr) res.status(400).json({status: 'failed', body: hashErr})
            else
                if (!isValid) res.status(400).json({status: 'failed', body: hashErr}) // ! if hash is not valid //
                else jwt.sign({ expiresIn: '2h' , data: {_id: result._id} },process.env.TOKEN_PRIVATE_KEY, function(tokenErr, token){
                    // fetch address
                    if (tokenErr) { res.status(400).json({status: 'failed', body: tokenErr}); return }
                    AddressModel.findOne({ customer_id: result._id })
                    .then((addressResult,err) => {
                        if (err) { res.status(400).json({status: 'failed', body: err}); return }
                        
                        delete result._id
                        delete result.password
                        delete addressResult.customer_id
                        delete addressResult._id

                        res.status(200).json({status: 'success', body: {
                            token: token,
                            info: result,
                            address: addressResult
                        }})
                    })
                })
        })
    })
    .catch(err => res.status(400).json({status: 'failed', body: err}))
}

async function _verify_customer(req, res){
    const data = req.body
    jwt.verify(data.token, process.env.TOKEN_PRIVATE_KEY, function(err, decode){
        if (err) res.status(400).json({status: 'failed', body: err})
        try{
            InfoModel.findOne({_id: new ObjectId(decode.data._id)})
            .then(function(infoResult, err){
                if (err) res.status(400).json({status: 'failed', body: err})
                AddressModel.findOne({customer_id: infoResult._id})
                .then(function(addressResult, err){
                    if (err) res.status(400).json({status:'failed', body: err})
                    const info = infoResult
                    const address = addressResult

                    delete info._id
                    delete info.password
                    delete address._id
                    delete address.customer_id

                    res.status(200).json({status: 'success', body: {
                        info: info,
                        address: address
                    }})
                })
            })
            .catch(err => res.status(400).json({status: 'failed', body: err}))
        }
        catch(err){
            // res.status(400).json({status: 'failed', body: err})
        }
    })
}

async function _update_customer_info(req, res){
    const {
        token, new_fullname
    } = req.body

    const newData = { $set: { fullname: new_fullname }}

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, function(err, decode){
        if (err) res.status(400).json({status: 'failed', body: err})
        if (decode === undefined) res.status(400).json({status:'failed', body: {message:'Invalid token'}})
        
        InfoModel.updateOne({_id: new ObjectId(decode.data._id)}, newData)
        .then((result, err) => {
            if (err) res.status(400).json({status: 'failed', body: err})
            res.status(201).json({status: 'success', body: result})
        })
        .catch(err => res.status(400).json({status: 'failed', body: err}))
    })
}

async function _update_customer_password(req, res){
    const {
        token, old_password, new_password
    } = req.body

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, function(err, decode){
        if (err) res.status(400).json({status:'failed', body:err})
        if (!('data' in decode)) res.status(400).json({status:'failed', body:{message:'Invalid token'}})
        InfoModel.findOne({_id: new ObjectId(decode.data._id)})
        .then((result, err) => {
            if (err) res.status(400).json({status:'failed', body:err})
            compare(old_password, result.password, function(err, isPassValid){
                if (err) res.status(400).json({status:'failed', body:err})

                if (isPassValid){
                    hash(new_password, SALT_ROUNDS, function(err, hash){
                        InfoModel.updateOne({_id: new ObjectId(decode.data._id)},{$set:{password: hash}})
                        .then((result, err) => {
                            if (err) res.status(400).json({status:'failed', body: err})

                            res.status(201).json({status:'success', body:result})
                        })
                    })
                }
                else res.status(400).json({status:'failed',body:{message: 'Wrong password'}})
            })
        })
        .catch(err => res.status(400).json({status: 'failed', body: err}))
    })
}

async function _update_customer_address(req, res){
    const {
        token, state, city, locality
    } = req.body
    const newData = { $set: { state: state, city: city, locality: locality }}

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, function(err, decode){
        if (err) res.status(400).json({status: 'failed', body: err})
        if (decode === undefined) res.status(400).json({status:'failed', body: {message:'Invalid token'}})
        
        AddressModel.updateOne({customer_id: new ObjectId(decode.data._id)}, newData)
        .then((result, err) => {
            if (err) res.status(400).json({status: 'failed', body: err})
            res.status(201).json({status: 'success', body: result})
        })
        .catch(err => res.status(400).json({status: 'failed', body: err}))
    })
}

module.exports = { _register_user, _register_address, _login_customer, _verify_customer, _update_customer_info, _update_customer_password, _update_customer_address }