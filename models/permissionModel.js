const mongoose = require('mongoose')
const { Schema } = mongoose;

const permissionSchema = new Schema({
    name : { type : String},
    createdAt : { type: Date , default: Date.now },
})

const permissionModel = mongoose.model('permissions', permissionSchema)

module.exports = permissionModel