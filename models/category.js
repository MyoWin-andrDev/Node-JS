const mongoose = require("mongoose");
//Schema
const { Schema } = mongoose;
const CategorySchema = new Schema({
    name: {type: String, unique: true, required: true},
    image: {type: String, required: true},
    createdAt : {type : Date, default :  Date.now()}
})

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel