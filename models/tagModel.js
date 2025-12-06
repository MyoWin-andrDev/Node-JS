const mongoose = require('mongoose');

const { Schema } = mongoose;
const tagSchema = new Schema({
    name : {type : String, unique :true, required : true},
    image : {type : String, required : true}
})

const tagModel = mongoose.model('tag', tagSchema);

module.exports = tagModel