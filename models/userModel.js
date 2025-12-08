const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {type : String, unique : true , required: true},
    phone : {type : String, unique : true, required: true},
    email : {type : String, required: true},
    createdAt : {type : Date, default: Date.now},
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;