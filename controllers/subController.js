const SubCategoryModel = require('../models/subCategoryModel');
const CategoryModel = require('../models/categoryModel');
const formatMessage = require('../utils/helper');

let addSubCategory = async (req, res) => {
    let saveItem = new SubCategoryModel(req.body);
    let result = await saveItem.save();

    let category = await CategoryModel.findById(req.body.categoryId);
    let updateParent = await CategoryModel.findByIdAndUpdate(category._id, {$push : {subCategory : result._id}});
    formatMessage(res, "Added New SubCategory", updateParent);
}

let getSingleSubCategory = async (req, res) => {
    let result = await SubCategoryModel.findById(req.params.id);
    formatMessage(res, "Single Categories", result);
}

let getAllSubCategory = async (req, res) => {
    let result = await SubCategoryModel.find().populate('childCategory').select('-__v -createdAt');
    formatMessage(res, "All SubCategories", result)
}

let updateSubCategory = async (req, res, next) => {
    let isExist = await SubCategoryModel.findById(req.params.id);
    if(isExist){
        await SubCategoryModel.findByIdAndUpdate(isExist._id, req.body)
        let updatedSubCategory = await SubCategoryModel.findById(req.params.id);
        formatMessage(res, "Updated SubCategory", updatedSubCategory)
    }
    else{
        next(new Error("No SubCategory Found !"))
    }
}

let deleteSubCategory = async (req, res, next) => {
    let isExist = await SubCategoryModel.findById(req.params.id);
    if(isExist){
        await CategoryModel.findByIdAndUpdate(isExist.categoryId , {$pull : {subCategory : isExist._id}});
        await SubCategoryModel.findByIdAndDelete(isExist._id)
        formatMessage(res, "Deleted SubCategory", isExist);
    }
    else{
        next(new Error("No SubCategory Found !"))
    }
}

module.exports = {
    getAllSubCategory,
    getSingleSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory
}