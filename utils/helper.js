let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let formatMessage = (res, msg , result) => {
    res.status(200).send({
        conn : true,
        msg : msg,
        result: result
    })
}

const getTokenFromSocket = (socket, next) => {
    const token = socket.handshake.query.token;

    if (!token) {
        return next(new Error("No token provided"));
    }

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        socket.userData = user;
        next();
    } catch (err) {
        next(new Error("Invalid or expired token"));
    }
};

module.exports = {
    encode : (payload) => bcrypt.hashSync(payload , 10),
    comparePassword : (password , hashString) => bcrypt.compare(password , hashString),
    getToken : (payload) => jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: payload
    }, process.env.SECRET_KEY),
    getTokenFromSocket,
    formatMessage,
}