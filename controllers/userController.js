const UserModel = require('../models/userModel');
const {formatMessage, encode , comparePassword, getToken} = require('../utils/helper');

let registerUser = async (req, res) => {
    let isPhoneExist = await UserModel.findOne({phone : req.body.phone})
    if(!isPhoneExist){
        req.body.password = encode(req.body.password);
        let saveUser = await new UserModel(req.body).save();
        formatMessage(res, "Register Successful", saveUser);
    }
    else{
        formatMessage(res, "Already Registered with that phone number")
    }
}

let loginUser = async (req, res, next) => {
    let isUserExist = await UserModel.findOne({phone : req.body.phone}).populate('role permissions');
    if(isUserExist){
        if(await comparePassword(req.body.password, isUserExist.password)){
            let userObj = isUserExist.toObject()
            delete userObj.password;
            userObj.token = ""
            userObj.token = getToken(userObj)
            formatMessage(res, "Login Successful",  userObj);
        }
        else{
            next(new Error("Wrong Password"))
        }
    }
    else{
        next(new Error("The phone number is not registered yet"))
    }

}

let addRoleToUser = async (req, res, next) => {
    let user = await UserModel.findById(req.body.userId);
    let isRoleExist = user.role.find(id => id.equals(req.body.roleId));

    if(!isRoleExist){
        await UserModel.findByIdAndUpdate(req.body.userId, {$push : {role : req.body.roleId}})
        let updatedUser = await UserModel.findById(req.body.userId)
        formatMessage(res, "Role Successfully Added", updatedUser)
    }
    else{
        formatMessage(res, "Role Already Exist", user)
    }
}

let removeRoleFromUser = async(req, res, next) => {
    let isUserExist = await UserModel.findById(req.body.userId);
    if(isUserExist){
        let isRoleExist = isUserExist.role.find(rid => rid.equals(req.body.roleId))
        if(isRoleExist){
            await UserModel.findByIdAndUpdate(req.body.userId, {$pull : {role : req.body.roleId}})
            formatMessage(res, "Role Successfully Removed", isRoleExist)
        }
        else{
            formatMessage(res, "role is not existed in that user", isRoleExist);
        }
    }
    else{
        formatMessage(res, "No user exists with that id", isUserExist);
    }
}

let addPermissionToUser = async (req, res, next) => {
    let isUserExist = await UserModel.findById(req.body.userId);
    if(isUserExist){
        let isPermissionExist = isUserExist.permissions.find(pId => pId.equals(req.body.permitId))
        if(!isPermissionExist){
            await UserModel.findByIdAndUpdate(req.body.userId, {$push : {permissions : req.body.permitId}})
            formatMessage(res, "Permission Successfully Given", isPermissionExist);
        }
        else{
            formatMessage(res, "Permission is already granted", isPermissionExist);
        }
    }
    else{
        formatMessage(res, "No user exists with that id", isUserExist);
    }
}

let removePermissionFromUser = async(req, res, next) => {
    let isUserExist = await UserModel.findById(req.body.userId);
    if(isUserExist){
        let isPermissionExist = isUserExist.permissions.find(pid => pid.equals(req.body.permitId))
        if(isPermissionExist){
            await UserModel.findByIdAndUpdate(req.body.userId, {$pull : {permissions : req.body.permitId}})
            formatMessage(res, "Permission Successfully Removed", isPermissionExist)
        }
        else{
            formatMessage(res, "Permission is not granted in that user", isPermissionExist);
        }
    }
    else{
        formatMessage(res, "No user exists with that id", isUserExist);
    }
}

module.exports = {
    registerUser,
    loginUser,
    addRoleToUser,
    removeRoleFromUser,
    addPermissionToUser,
    removePermissionFromUser
}