const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {type : String, required: true},
    phone : {type : String, unique : true, required: true},
    password : {type : String, required: true},
    role : {type : Schema.Types.ObjectId, ref : "role"},
    permissions : {type : Schema.Types.ObjectId, ref : "permissions"},
    createdAt : {type : Date, default: Date.now},
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;