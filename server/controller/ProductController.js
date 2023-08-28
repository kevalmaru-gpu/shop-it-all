const ProductModel = require('../model/ProductModel')
const CartModel = require('../model/CartModel')

const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')

async function _add_product(req, res){
    var ErrorLog = ''
    req.body.forEach(e => {
        console.log(e)  
        const productData = new ProductModel(e)
        productData.save()
        .then((result, err) => {
            if (err) ErrorLog += '\n' + err
        })
        .catch(err => {
            ErrorLog += '\n' + err
        })
    })
    res.status(200).json({status:'success', message: ErrorLog})
}

async function _get_products_by_name(req, res){
    const text = req.body.text

    ProductModel.find({"name": {$regex: text, $options: 'i'}})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

async function _get_product_by_id(req, res){
    const { _id, token } = req.body

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
        await ProductModel.findOne({_id: new Types.ObjectId(_id)})
        .then(async (productRes, err) => {
            if (err && !result){
                res.status(400).json({status: 'failed', message: null})
                return
            }
            
            try{
                const processedData = await CartModel.findOne({user_id: decode.data._id, product_id: _id, is_bought: false})
                .then((cartRes, err) => {
                    if (err) res.status(400).json({status: 'failed', message: null})
                    return {...productRes, inCart: cartRes ? true: false}
                })
                delete processedData['$isNew']
                delete processedData['$__']
                const modifiedProductData = {...processedData._doc, inCart: processedData.inCart}

                res.status(200).json({status: 'success', message: modifiedProductData})
            } catch(err){
                res.status(400).json({status: 'failed', message: null})
            }
        })
    })
}

async function _get_product_from_main_category(req, res){
    const { main_category, token } = req.body

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function (err, decode){
        try{    
            if (err) res.status(400).json({status:'failed', message:err})
            await ProductModel.find({ main_category: main_category })
            .then(async (response, err) => {
                if (err || !response) res.status(400).json({status:'failed', message:null})
                const productsData = await Promise.all(response.map(async product => {
                    return await CartModel.findOne({user_id: decode.data._id, product_id: product._id})
                    .then((result, err) => {
                        if (!result) return product
                    })
                }))
                res.status(200).json({status:'success', message:productsData})
            })
            .catch(err => res.status(400).json({status:'failed', message: err}))
        } catch (err) {
        }
    })
}

async function _get_product_from_sub_category(req, res){
    const { sub_category } = req.body

    ProductModel.find({ sub_category: sub_category })
    .then((response, err) => {
        if (err) res.status(400).json({status:'failed', message:err})
        res.status(200).json({status:'success', message:response})
    })
    .catch(err => res.status(400).json({status:'failed', message: err}))
}

async function _get_product_from_key_word(req, res){
    const { key } = req.body

    ProductModel.find({ $or: [ {name:{$regex: new RegExp(key, 'i')}},  {name:{$regex: new RegExp(key, 'i')}}]})
    .then((response, err) => {
        if (err) res.status(400).json({status:'failed', message:err})
        res.status(200).json({status:'success', message:response})
    })
    .catch(err => res.status(400).json({status:'failed', message: err}))
}

async function _add_to_cart(req, res){
    const { token, product_id } = req.body
   
    await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
        try{
            if (err) res.status(400).json({ status: 'failed', message: err })
            if (decode == undefined) throw new Error('token invalid')

            const data = { user_id: decode.data._id, product_id: product_id, count: 1, is_bought: false }

            await CartModel.findOne(data)
            .then(async (response, err) => {
                if (err || response != null) throw new Error('item already exists in cart')


                const cartModel = new CartModel(data)
                cartModel.save()
                .then((response, err) => {
                    if (err) res.status(400).json({ status: 'failed', message: err })
                    
                    res.status(201).json({ status: 'success', message: response })
                })
                .catch(err => res.status(400).json({ status: 'failed', message: err }))
            })
        }
        catch(err){
            res.status(400).json({ status: 'failed', message: err })
        }
    })
}

async function _remove_from_cart(req, res){
    const { token, product_id } = req.body
    await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
        try{
            if (err) res.status(400).json({ status: 'failed', message: err })
            if (decode == undefined) throw new Error('token invalid')

            const data = { user_id: decode.data._id, product_id: product_id }

            await CartModel.deleteOne(data)
            .then(async (response, err) => {
                console.log(response)
                if (err || response == null) throw new Error('item doesnt exists in cart')
                res.status(200).json('Item removed')
            })
        }
        catch(err){
            res.status(400).json({ status: 'failed', message: err })
        }
    })
}

async function _get_from_cart(req, res){
    const { token } =  req.body

    try{
        await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
            if (err) res.status(400).json({ status: 'failed', message: err })

            await CartModel.find({ user_id: decode.data._id, is_bought: false })
            .then(async (response, err) => {
                if (err) res.status(400).json({ status: 'failed', message: err})
                
                var error_txt = ""
                var products_data = await Promise.all(response.map(async  ele => {
                    if (!new RegExp("^[0-9a-fA-F]{24}$").test(ele.product_id)){
                        error_txt += `\\n${ele.product_id} is not a valid product id`
                        return false
                    }

                    const productData =  await ProductModel.findOne({ _id: new Types.ObjectId(ele.product_id)})
                    .then((product_response, err) => {
                        if (err) error_txt += `\n${err}`
                        if (!err){
                            return {...product_response, count: ele.count}
                        }
                    })
                    .catch(err => error_txt += `/n${err}`)
                    delete productData['$isNew']
                    delete productData['$__']

                    const modifiedProductData = {...productData._doc, count: productData.count}
                    return modifiedProductData
                }))

                res.status(200).json({ status: 'success', message: products_data, error: error_txt})
            })
            .catch(err => {
                if (err) res.status(400).json({ status: 'failed', message: err})
            })
        })
    }
    catch(err){
    }
}

async function _cart_count_route(req, res){
    const {token, product_id, count} = req.body

    if (count <= 0) {
        res.status(400).json({status: 'failed', message: 'Invalid count'})
        return
    }
    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
        if (err) res.status(400).json({status: 'failed', message: err})

        try{
            CartModel.updateOne({ user_id: decode.data._id, product_id: product_id}, {$set: {count: count}})
            .then((result, err) => {
                if (err || result == null) res.status(400).json({status: 'failed', message: 'Cannot find product'})
                res.status(200).json({status: 'success', message: result})
            })
        } catch(err) {
        }
    })
}

async function _buy_products(req, res){
    const { products, token } = req.body

    jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, async function(err, decode){
        if (err){
            res.status(400).json({status: 'failed', message: err})
            return
        }

        try{
            await Promise.all(
                products.map(async product_id => {
                    await CartModel.findOne({user_id: decode.data._id, product_id: product_id})
                    .then(async (cartRes, err) => {
                        if (err) res.status(400).json({status: 'failed', message: err})
                        if (!cartRes){
                            if (!new RegExp("^[0-9a-fA-F]{24}$").test(product_id)){
                                throw new Error("Invalid product ID")
                            }
                            
                            await ProductModel.findOne({_id: new Types.ObjectId(product_id)})
                            .then((productRes, err) => {
                            
                                if (err) res.status(400).json({status: 'failed', message: err})
                                if (!productRes) res.status(400).json({status: 'failed', message: 'Invalid product ID'})
                            })
                            const cartModel = new CartModel({user_id: decode.data._id, product_id: product_id, count: 1, is_bought: false})
                                
                            await cartModel.save()
                            .then((saveRes, err) => {  if (err) res.status(400).json({status: 'failed', message: err}) })
                            .catch(err => { if (err) res.status(400).json({status: 'failed', message: err}) })
                        }

                        await CartModel.updateOne({user_id: decode.data._id, product_id: product_id }, {$set: {is_bought: true}})
                        .then((updateRes, err) => {
                            if (err) res.status(400).json({status: 'failed', message: err})
                        })
                    })
                })
            )
            res.status(201).json({status: 'success', message: 'all bought!'})
        } catch(err) {
            res.status(400).json({status: 'failed', message: err})
        }
    })
}

module.exports = { _get_products_by_name, _add_product, _get_product_from_main_category, _get_product_from_sub_category, _get_product_from_key_word, _add_to_cart, _get_from_cart, _cart_count_route, _get_product_by_id, _buy_products, _remove_from_cart }