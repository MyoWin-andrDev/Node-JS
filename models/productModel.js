const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name : {type : String, required: true},
    price : {type : Number, required: true},
    brand : {type : String, required : true},
    category : {type : Schema.Types.ObjectId, ref : 'category'},
    subCategory : {type : Schema.Types.ObjectId, ref : 'subCategory'},
    childCategory : {type : Schema.Types.ObjectId, ref : 'childCategory'},
    tag : {type : Schema.Types.ObjectId, ref : 'tag'},
    refund : {type : String, enum : ['YES', 'NO', 'IN_10_DAY'], default : 'NO'},
    feature : {type : Object},
    color : {type : Array},
    image : {type : Array},
    createdAt : {type : Date, default : Date.now()}
})

const ProductModel = mongoose.model('product', productSchema);

module.exports = ProductModel
