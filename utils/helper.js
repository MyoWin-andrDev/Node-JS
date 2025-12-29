let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let formatMessage = (res, msg , result) => {
    res.status(200).send({
        conn : true,
        msg : msg,
        result: result
    })
}

let getTokenFromSocket = async (socket, next) => {
    let token = socket.handshake.query.token
    if(token){
        let user = jwt.verify(token, process.env.SECRET_KEY)
        console.log(user)
        next()
    }
    else{
        next(new Error("No Token Found In Handshake !!!"))
    }
}

module.exports = {
    formatMessage,
    encode : (payload) => bcrypt.hashSync(payload , 10),
    comparePassword : (password , hashString) => bcrypt.compare(password , hashString),
    getToken : (payload) => jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
    }, process.env.SECRET_KEY),
    getTokenFromSocket
}