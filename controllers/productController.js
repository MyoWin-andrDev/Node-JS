const ProductModel = require('../models/productModel');
let { formatMessage } = require('../utils/helper');
require('dotenv').config();

let addProduct = async (req, res, next) => {
    let isProductExist = await ProductModel.findOne({name : req.body.name})
    if(isProductExist){
        next(new Error("Product is already in use !!!"))
    }
    else{
        let product = await new ProductModel(req.body)
        let result = await product.save()
        formatMessage(res, "Product Successfully Added", result)
    }
}

let getAllProduct = async (req, res , next) => {
    let result = await ProductModel.find()
    formatMessage(res, "All Product ", result)
}

let getAllProductByPage = async(req, res, next) => {
    let page = req.params.page;
    let skipCount = Number(page) === 1 ? 0 : ((Number(page) -1 ) * process.env.PAGE_LIMIT)
    let result = await ProductModel.find().skip(skipCount).limit(Number(process.env.PAGE_LIMIT))
    formatMessage(res, "Product By Page", result)
}

let getProductByCategory = async (req, res , next) => {
    let result = await ProductModel.find({category : req.params.id})
    if(result){
        formatMessage(res, "Product by Category", result)
    }
    else{
        formatMessage(res, "No product found in that category", result)
    }
}

let getProductBySubCategory = async (req, res, next) => {
    let result = await ProductModel.find({subCategory : req.params.id})
    if(result){
        formatMessage(res, "Product by SubCategory", result)
    }
    else{
        formatMessage(res, "No product found in that subcategory", result)
    }
}


let getProductByChildCategory = async (req, res, next) => {
    let result = await ProductModel.find({childCategory : req.params.id})
    if(result){
        formatMessage(res, "Product by ChildCategory", result)
    }
    else{
        formatMessage(res, "No product found in that childcategory", result)
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProductByCategory,
    getProductBySubCategory,
    getProductByChildCategory,
    getAllProductByPage
}