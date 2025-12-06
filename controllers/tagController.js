const tagModel = require('../models/tagModel');
const formatMessage = require('../utils/helper');

let getAllTags = async (req, res) => {
    let result = await tagModel.find();
    formatMessage(res, "All Tag", result);
}

let getSingleTag = async (req, res) => {
    let isExist = await tagModel.findById(req.params.id);
    if(isExist){
        formatMessage(res, "Single Tag", isExist);
    }
    else{
        formatMessage(res, "No tag found with this id");
    }
}

let addTag = async (req, res) => {
    let saveItem = new tagModel(req.body);
    let result = await saveItem.save();
    formatMessage(res, "New Tag Added", result);
}

let updateTag = async (req, res) => {
    let isExist = await tagModel.findById(req.params.id);
    if(isExist){
        let updateItem = await tagModel.findByIdAndUpdate(isExist._id, req.body);
        formatMessage(res, "Tag Successfully Updated", updateItem);
    }
    else{
        formatMessage(res, "No tag found with this id");
    }
}

let deleteTag = async (req, res) => {
    let isExist = await tagModel.findById(req.params.id);
    if(isExist){
        let updateItem = await tagModel.findByIdAndDelete(isExist._id, req.body);
        formatMessage(res, "Tag Successfully Deleted", isExist);
    }
    else{
        formatMessage(res, "No tag found with this id");
    }
}

module.exports = {
    getAllTags,
    getSingleTag,
    addTag,
    updateTag,
    deleteTag
}
