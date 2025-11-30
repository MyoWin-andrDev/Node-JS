const SubCategoryModel = require('../models/subCategoryModel');
const ChildCategoryModel = require('../models/childCategoryModel');
const formatMessage = require('../utils/helper');

let getAllChildCategory = async (req, res) => {
    let result = await ChildCategoryModel.find();
    formatMessage(result, "All ChildCategories", result);
}

let addChildCategory = async (req, res) => {
    let childCategory = await new ChildCategoryModel(req.body);
    let result = await childCategory.save();
    let subCategory = await SubCategoryModel.findById(req.body.subCategoryId);
    let updateSubCategory = await SubCategoryModel.findByIdAndUpdate(subCategory._id, {$push : {childCategory : result._id}});
    formatMessage(res, "Added New ChildCategory", updateSubCategory);
}

let updateChildCategory = async (req, res) => {
    let isExist = await ChildCategoryModel.findById(req.params.id);
    if(isExist){
        let updateChildCategory = await ChildCategoryModel.findByIdAndUpdate(isExist._id, req.body);
        formatMessage(res, "Updated ChildCategory", updateChildCategory);
    }
}

let deleteChildCategory = async (req, res) => {
    let isExist = await ChildCategoryModel.findById(req.params.id);
    if(isExist){
        let updateSubCategory = await SubCategoryModel.findByIdAndUpdate(isExist.subCategoryId, {$pull : {childCategory : isExist._id}});
        let result = await ChildCategoryModel.findByIdAndDelete(isExist._id);
        formatMessage(res, "Deleted ChildCategory", updateSubCategory);
    }
}

module.exports = {
    getAllChildCategory,
    addChildCategory,
    updateChildCategory,
    deleteChildCategory
}