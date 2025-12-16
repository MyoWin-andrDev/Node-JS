let RoleModel = require('../models/roleModel');
const formatMessage = require('../utils/helper');
const tagModel = require("../models/tagModel");

let getAllRoles = async (req, res, next) => {
    let result = await RoleModel.find()
    formatMessage(res, "Get All Roles", result)
}

let getSingleRole = async (req, res, next) => {
    let isExist = await RoleModel.findById(req.params.id);
    if(isExist){
        formatMessage(res, "Single Role", isExist);
    }
    else{
        formatMessage(res, "Role Not Found", isExist);
    }
}

let addRole = async (req, res) => {
    let newRole = await new RoleModel(req.body);
    let result = await newRole.save();
    formatMessage(res, "Added Role", result);
}

let updateRole = async (req, res) => {
    let isExist = await RoleModel.findById(req.params.id);
    if(isExist){
        await RoleModel.findByIdAndUpdate(req.params.id , req.body);
        let result = await RoleModel.findById(req.params.id);
        formatMessage(res, "Role Updated Successfully", result)
    }
    else{
        formatMessage(res,"No Role found with that id")
    }
}

let deleteRole = async (req, res, next) => {
    let isExist = await RoleModel.findById(req.params.id);
    if(isExist){
        let result = await RoleModel.findByIdAndDelete(req.params.id);
        formatMessage(res, "Role Deleted Successfully", result);
    }
    else{
        formatMessage(res, "Role Not Found");
    }
}
let addPermission = async (req, res, next) => {
    let result = await RoleModel.findByIdAndUpdate(req.body.roleId, {$push : {permissions : req.body.permitId}})
    formatMessage(res, "Role Successfully Added", result)
}

let removePermission  = async (req, res, next) => {
    let result = await RoleModel.findByIdAndUpdate(req.body.roleId, {$pull : {permissions : req.body.permitId}})
    formatMessage(res, "Role Successfully Removed", result)
}

module.exports = {
    getSingleRole,
    getAllRoles,
    addRole,
    updateRole,
    deleteRole,
    addPermission,
    removePermission
}