const mongoose  = require('mongoose');

//SubCategory Schema
const {Schema} = mongoose;

const subCategorySchema = new Schema({
    name : {type: String, unique: true, required: true},
    image : {type: String, required: true},
    categoryId : {type: Schema.Types.ObjectId, ref : "category", required: true},
    createdAt : {type: Date, default: Date.now},
})

const SubCategoryModel = mongoose.model("subCategory", subCategorySchema);

module.exports = SubCategoryModel;