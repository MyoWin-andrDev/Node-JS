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
    let isUserExist = await UserModel.findOne({phone : req.body.phone});
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
        let isRoleExist = isUserExist.role.find(it.equals(req.body.roleId))
        if(isRoleExist){
            await UserModel.findByIdAndUpdate(req.body.userId, {$pull : {role : req.body.roleId}})
            formatMessage(res, "Role Successfully Removed", isRoleExist)
        }
        else{
            formatMessage(res, "role is not existed in that user", isUserExist);
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
    removeRoleFromUser
}