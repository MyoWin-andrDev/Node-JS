const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user : {type : Schema.Types.ObjectId, ref : 'user'},
    count : {type : Number, required: true},
    total : {type : Number, required: true},
    status : {type : Boolean, default: false},
    orderItems : [{type : Schema.Types.ObjectId, ref : 'orderItem'}],
    createdAt : {type : Date, default: Date.now},
})

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;