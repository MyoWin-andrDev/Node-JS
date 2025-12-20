const UserModel = require('../models/userModel');
const {formatMessage, encode , comparePassword, getToken} = require('../utils/helper');

let registerUser = async (req, res) => {
    req.body.password = encode(req.body.password);
    let saveUser = await new UserModel(req.body).save();
    formatMessage(res, "Register Successful", saveUser);
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
    let result = await UserModel.findByIdAndUpdate(req.body.userId, {$push : {role : req.body.roleId}})
    let updatedUser = await UserModel.findById(req.body.userId)
    formatMessage(res, "Role Successfully Added", updatedUser)
}

module.exports = {
    registerUser,
    loginUser,
    addRoleToUser
}