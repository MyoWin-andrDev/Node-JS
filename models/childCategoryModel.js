const mongoose = require('mongoose');

//Child Category Model
const {Schema} = mongoose;
const childCategorySchema = new Schema({
    name: {type : String, required: true},
    image: {type : String, required: true},
    subCategoryId : {type : Schema.Types.ObjectId, ref : 'subCategory', required: true},
    createdAt: {type : Date, default: Date.now},
})

const childCategoryModel = mongoose.model("childCategory", childCategorySchema);

module.exports = childCategoryModel;