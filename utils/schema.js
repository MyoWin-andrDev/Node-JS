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
        })
    },
    AllSchema : {
        id : joi.object({
            id : Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        })
    }
}