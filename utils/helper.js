let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let formatMessage = (res, msg , result) => {
    res.status(200).send({
        conn : true,
        msg : msg,
        result: result
    })
}

module.exports = {
    formatMessage,
    encode : (payload) => bcrypt.hashSync(payload , 10),
    comparePassword : (password , hashString) => bcrypt.compare(password , hashString),
    getToken : () => jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
    }, process.env.SECRET_KEY),
}