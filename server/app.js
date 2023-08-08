require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongo_client = require('./config/mongo_connect')
const UserRouter = require('./router/UserRouter')
const ServiceRouter = require('./router/ServiceRouter')
const ProductRouter = require('./router/ProductRouter')

const express = require('express')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/user', UserRouter)
app.use('/service', ServiceRouter)
app.use('/product', ProductRouter)

app.listen(5000, (err) => {
    if (err) console.error(`[-] cannot start server\n${err}`)
    console.log('[+] listening to PORT 5000')
})