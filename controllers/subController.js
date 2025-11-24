const SubCategoryModel = require('../models/subCategory');
const CategoryModel = require('../models/category');
const formatMessage = require('../utils/helper');

let addSubCategory = async (req, res) => {
    let saveItem = new SubCategoryModel(req.body);
    let result = await saveItem.save();

    let category = await CategoryModel.findById(req.body.categoryId);
    let updateParent = await CategoryModel.findByIdAndUpdate(category._id, {$push : {subCategory : result._id}});
    formatMessage(res, "Added New SubCategory", updateParent);
}

let getAllCategory = async (req, res) => {
    let result = await SubCategoryModel.find()
    formatMessage(res, "All Categories", result)
}

let updateSubCategory = async (req, res, next) => {
    let isExist = await SubCategoryModel.findById(req.params.id);
    if(isExist){
        await SubCategoryModel.findByIdAndUpdate(isExist._id, req.body)
        let updatedSubCategory = await SubCategoryModel.findById(req.params.id);
        formatMessage(res, "Updated SubCategory", updatedSubCategory)
    }
    else{
        next(new Error("No Category Found !"))
    }
}

module.exports = {
    getAllCategory,
    addSubCategory,
    updateSubCategory
}