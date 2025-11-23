const CategoryController = require("../models/category");
const FormatMessage = require("../utils/helper");
const {deleteFile} = require("../utils/gallery");

let getAllItem = async (req, res) => {
    let result = await CategoryController.find()
    FormatMessage(res, "All Categories", result)
}

let getSingleItem = async (req, res) => {
    let category = await CategoryController.findById(req.params.id);
    FormatMessage(res, "Single Categories", category)
}

let addNewItem = async (req, res) => {
    let category = new CategoryController(req.body);
    let saveItem = await category.save();
    FormatMessage(res, "Add New Category", saveItem)
}

let deleteItem = async (req, res, next) => {
    let isExist = await CategoryController.findById(req.params.id);
    if(isExist){
        await CategoryController.findByIdAndDelete(isExist._id)
        let deletedItem = await CategoryController.findById(req.params.id);
        FormatMessage(res, "Delete Category", deletedItem)
    }
    else{
        next(new Error("No Category Found !"))
    }
}

let updateItem = async (req,res,next) => {
    let isExist = await CategoryController.findById(req.params.id);
    if(isExist){
        await CategoryController.findByIdAndUpdate(req.params.id, req.body)
        let updatedItem = await CategoryController.findById(req.params.id)
        FormatMessage(res, "Update Category", updatedItem)
    }
    else{
        next(new Error("No Category Found !"))
    }
}

module.exports = {
    getAllItem,
    getSingleItem,
    addNewItem,
    deleteItem,
    updateItem
}