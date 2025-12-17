const joi = require('joi')
const Joi = require("joi");


module.exports = {
    CategorySchema : {
        add  : joi.object({
            name: joi.string().min(3).required(),
            image : joi.string().required(),
        }),
    },
    TagSchema : {
        add : Joi.object({
            name : joi.string().min(3).required(),
            image : joi.string().required(),
        }),
        update : Joi.object({
            name : joi.string().min(3).required(),
            image : joi.string().required(),
        })
    },
    PermissionSchema : {
        add : Joi.object({
            name : Joi.string().min(3).required(),
        }),
        update : Joi.object({
            name : Joi.string().min(3).required(),
        })
    },
    RoleSchema : {
        add : Joi.object({
            name : Joi.string().min(3).required(),
        }),
        update : Joi.object({
            name : Joi.string().min(3).required(),
        })
    },
    UserSchema : {
        register : Joi.object({
            name : Joi.string().min(3).required(),
            phone : Joi.string().min(8).required(),
            password : Joi.string().min(6).required()
        }),
        login : Joi.object({
            phone : Joi.string().min(8).required(),
            password : Joi.string().required()
        })
    },
    AllSchema : {
        id : joi.object({
            id : Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        })
    }
}