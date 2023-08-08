const nodemailer = require('nodemailer')

async function SendMail(data) {
    const {
        email,
        subject,
        text
    } = data
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        type: "SMTP",
        secure: true,     
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL, // generated ethereal user
          pass: process.env.GMAIL_CODE, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Shop It 🛍️" <shopitecommerce.live@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
      }, function (error, result){
        if (error) return error
        return result
      })
    
      // console.log("Message sent: %s", info.messageId);
      // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      return info
}

module.exports = SendMail