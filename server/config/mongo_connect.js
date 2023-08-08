const { connect } = require('mongoose')

const client = connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log('[+] connected to database'))
                .catch((err) => console.error(`[+] failed connecting to database\n${err}`))

module.exports = client