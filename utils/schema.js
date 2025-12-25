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
        }),
        addPermissionToUser : joi.object({
            userId : objectId,
            permitId : objectId
        })
    },
    ProductSchema : {
        addProduct : joi.object({
            'name' : joi.string().required(),
            'price' : joi.number().required(),
            'brand' : joi.string().required(),
            'category' : objectId,
            'subCategory' : objectId,
            'childCategory' : objectId,
            'tag' : objectId,
            'refund' : joi.string().required(),
            'feature' : joi.object(),
            'color' : joi.array(),
            'image' : joi.array(),
            user : joi.optional()
        })
    },
    AllSchema : {
        id : joi.object({
            id : objectId
        }),
        page : joi.object({
            page : joi.number().min(1).required()
        })
    }
}

