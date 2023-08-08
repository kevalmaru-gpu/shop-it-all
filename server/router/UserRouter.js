const { Router } = require('express')
const { _register_user, _register_address, _login_customer, _verify_customer, _update_customer_info, _update_customer_password, _update_customer_address } = require('../controller/UserController')

const UserRouter = Router()

UserRouter.post('/register/info', _register_user)
UserRouter.post('/register/address', _register_address)
UserRouter.post('/login', _login_customer)
UserRouter.post('/verify', _verify_customer)
UserRouter.post('/update/info', _update_customer_info)
UserRouter.post('/update/password', _update_customer_password)
UserRouter.post('/update/address', _update_customer_address)

module.exports = UserRouter