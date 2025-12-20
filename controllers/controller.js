const CategoryModel = require("../models/categoryModel");
const SubCategoryModel = require("../models/subCategoryModel");
const ChildCategoryModel = require("../models/childCategoryModel");
const { formatMessage } = require("../utils/helper");
const {deleteFile} = require("../utils/gallery");

let getAllItem = async (req, res) => {
    let result = await CategoryModel.find().populate(
        {
            path : 'subCategory',
            model : SubCategoryModel,
            populate : {
                path : 'childCategory',
                model : ChildCategoryModel
            }
        }
    )
    formatMessage(res, "All Categories", result)
}

let getSingleItem = async (req, res) => {
    let category = await CategoryModel.findById(req.params.id);
    formatMessage(res, "Single Categories", category)
}

let addNewItem = async (req, res, next) => {
    // let category = new CategoryModel(req.body);
    // let saveItem = await category.save();
    formatMessage(res, "Add New Category", req.body)
}

let deleteItem = async (req, res, next) => {
    let isExist = await CategoryModel.findById(req.params.id);
    if(isExist){
        await CategoryModel.findByIdAndDelete(isExist._id)
        let deletedItem = await CategoryModel.findById(req.params.id);
        formatMessage(res, "Delete Category", deletedItem)
    }
    else{
        next(new Error("No Category Found !"))
    }
}

let updateItem = async (req,res,next) => {
    let isExist = await CategoryModel.findById(req.params.id);
    if(isExist){
        await CategoryModel.findByIdAndUpdate(req.params.id, req.body)
        let updatedItem = await CategoryModel.findById(req.params.id)
        formatMessage(res, "Update Category", updatedItem)
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