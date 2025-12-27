const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel');
const ProductModel = require('../models/productModel');
const { formatMessage } = require('../utils/helper');

let addOrder = async (req, res) => {
    let order = new OrderModel({})
    let orderItems = req.body.orderItems;
    let authUser = req.body.user
    let insertOrderItem = [];
    for await (const orderItem of orderItems) {
        let product = await ProductModel.findById(orderItem.productId);
        let object = {
            orderId : order._id,
            count : orderItem.count,
            productId : product._id,
            price : product.price,
            discount : product.discount,
        }
        insertOrderItem.push(object);
    }
    let resultItem = await OrderItemModel.insertMany(insertOrderItem)
    let itemId = []
    resultItem.map(item => itemId.push(item._id))
    //Calculating Total Price
    let total = 0;
    for (const item of insertOrderItem) {
        total += item.count * item.price;
    }
    //Adding Value to order
    order.user = authUser
    order.count = orderItems.length
    order.total = Number(total)
    order.orderItems = itemId
    await order.save()
    formatMessage(res, "Add Order", order);
}

let getAllOrder = async (req, res, next) => {
    let result = await OrderModel.findOne({user : req.body.id}).populate('orderItems')
    formatMessage(res, "Get All Orders", result)
}

module.exports = {
    addOrder,
    getAllOrder
}