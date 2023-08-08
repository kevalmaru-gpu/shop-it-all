const { Router } = require('express')
const { _add_product, _get_product_from_main_category, _get_product_from_sub_category, _get_product_from_key_word, _add_to_cart, _get_from_cart, _cart_count_route, _get_product_by_id, _buy_products } = require('../controller/ProductController')

const ProductRouter = Router()

ProductRouter.post('/add', _add_product)
ProductRouter.post('/get_from_main_category', _get_product_from_main_category)
ProductRouter.post('/get_from_sub_category', _get_product_from_sub_category)
ProductRouter.post('/get_from_key_word', _get_product_from_key_word)
ProductRouter.post('/add_to_cart', _add_to_cart)
ProductRouter.post('/get_from_cart', _get_from_cart)
ProductRouter.post('/update_cart_count', _cart_count_route)
ProductRouter.post('/get_product_by_id', _get_product_by_id)
ProductRouter.post('/buy_products', _buy_products)

module.exports = ProductRouter