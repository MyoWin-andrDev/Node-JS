const db_collections = {
    categoryDB : require('../models/categoryModel'),
    childCategoryDB : require('../models/childCategoryModel'),
    subCategoryDB : require('../models/subCategoryModel'),
    orderDB : require('../models/orderModel'),
    orderItemDB : require('../models/orderItemModel'),
    permissionDB : require('../models/permissionModel'),
    productDB : require('../models/productModel'),
    roleDB : require('../models/roleModel'),
    tagDB : require('../models/tagModel'),
    userDB : require('../models/userModel'),
}

module.exports = db_collections