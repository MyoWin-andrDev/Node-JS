const joi = require('joi')

/**
 * Reusable MongoDB ObjectId validator
 */
const objectId = joi.string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .required();


module.exports = {
    CategorySchema : {
        add  : joi.object({
            name: joi.string().min(3).required(),
            image : joi.string().required(),
        }),
    },
    TagSchema : {
        add : joi.object({
            name : joi.string().min(3).required(),
            image : joi.string().required(),
        }),
        update : joi.object({
            name : joi.string().min(3).required(),
            image : joi.string().required(),
        })
    },
    PermissionSchema : {
        add : joi.object({
            name : joi.string().min(3).required(),
        }),
        update : joi.object({
            name : joi.string().min(3).required(),
        })
    },
    RoleSchema : {
        add : joi.object({
            name : joi.string().min(3).required(),
        }),
        update : joi.object({
            name : joi.string().min(3).required(),
        })
    },
    UserSchema : {
        register : joi.object({
            name : joi.string().min(3).required(),
            phone : joi.string().min(8).required(),
            password : joi.string().min(6).required()
        }),
        login : joi.object({
            phone : joi.string().min(8).required(),
            password : joi.string().required()
        }),
        addRoleToUser : joi.object({
            userId : objectId,
            roleId : objectId
        })
    },
    AllSchema : {
        id : joi.object({
            id : objectId
        })
    }
}

