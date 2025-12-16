const PermissionModel = require('../models/permissionModel');
const formatMessage = require('../utils/helper');

let add = async (req, res, next) => {
    let isPermitted = await PermissionModel.findOne({name : req.body.name})
    if(!isPermitted){
        let result = new PermissionModel({name : req.body.name}).save()
        formatMessage(res, "Permission Created", result)
    }
    else{
        next(new Error("Permission is already granted"))
    }
}

let getAllPermissions = async (req,res) => {
    let result = await PermissionModel.find()
    formatMessage(res, "All Permissions", result)
}

let getSinglePermission = async (req, res) => {
    let isPermitted = await PermissionModel.findById(req.params.id);
    if(isPermitted){
        formatMessage(res, "A Single Permissions", isPermitted)
    }
    else{
        formatMessage(res, "Permission not found", isPermitted)
    }
}

let updatePermission = async (req, res) => {
    let isPermitted = await PermissionModel.findById(req.params.id);
    if(isPermitted){
        await PermissionModel.findByIdAndUpdate(req.params.id, req.body)
        let updatedPermission = await PermissionModel.findById(req.params.id);
        formatMessage(res, "Permission Updated", updatedPermission)
    }
    else{
        formatMessage(res, "Permission not found", isPermitted)
    }
}

let deletePermission = async (req, res) => {
    let isPermitted = await PermissionModel.findById(req.params.id);
    if(isPermitted){
        await PermissionModel.findByIdAndDelete(req.params.id);
        formatMessage(res, "Permission Deleted", isPermitted)
    }
    else{
        formatMessage(res, "Permission not found", isPermitted)
    }
}

module.exports = {
    add,
    getAllPermissions,
    getSinglePermission,
    updatePermission,
    deletePermission
}