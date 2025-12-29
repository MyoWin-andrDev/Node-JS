const {formatMessage, encode , comparePassword, getToken} = require('../utils/helper');
const db = require('./db_collections');

let ownerUser = {
    name : "Phyo Hein",
    phone : "09250568981",
    password : "phyohein11",
    role : []
}

let generateOwner = async () => {
    ownerUser.password = encode(ownerUser.password);
    let result = await db.userDB(ownerUser).save()
    console.log("Owner Generated",result)
}

module.exports = { generateOwner };