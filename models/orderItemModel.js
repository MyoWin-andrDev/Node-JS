const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
    orderId : {type : Schema.Types.ObjectId, ref : 'order'},
    count : {type : Number, required: true},
    productId : {type : Schema.Types.ObjectId, ref : 'product'},
    price : {type : Number, required: true},
    discount : {type : Number, default : 0},
    status : {type : Boolean , default: false},
    createdAt : {type : Date, default: Date.now},
})

const OrderItemModel = mongoose.model("orderItem", OrderItemSchema);

module.exports = OrderItemModel;