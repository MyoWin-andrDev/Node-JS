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

module.exports = {
    add
}