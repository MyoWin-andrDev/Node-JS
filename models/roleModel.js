const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: {type : String, required: true},
    permissions : {type : Schema.Types.ObjectId, ref : 'permissions'},
    createdAt : {type : Date , default : Date.now},
})

const roleModel = mongoose.model('role', roleSchema);

module.exports = roleModel;