const {Router} = require('express')
const SendMail = require('../service/SendMail')

const ServiceRouter = Router()

// * email router

ServiceRouter.post('/send_email', async function(req, res){
    const data = req.body
    const emailData = {
        email: data.email,
        subject: data.subject,
        text: data.text
    }
    const response = SendMail(emailData)

    res.status(200).json(response)
})

module.exports = ServiceRouter