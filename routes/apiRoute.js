const router = require("express").Router();
const UserController = require("../controllers/userController");
const CategoryController = require("../controllers/controller");
const ProductController = require("../controllers/productController");
const SubCategory = require('../controllers/subController');
const ChildCategory = require('../controllers/childController');
const TagController = require('../controllers/tagController');
const ProductModel = require('../controllers/productController');
const OrderController = require('../controllers/orderController')
const { validateBody, validateParams, validateToken} = require("../utils/validator");
const { UserSchema , AllSchema } = require("../utils/schema");

router.post('/register', validateBody(UserSchema.register), UserController.registerUser)
router.post('/login', validateBody(UserSchema.login) ,UserController.loginUser)
//Category
router.get('/category', CategoryController.getAllItem)
//Product
router.get('/product', ProductController.getAllProduct)
//SubCategory
router.get('/subCategory', SubCategory.getAllSubCategory)
//ChildCategory
router.get('/childCategory', ChildCategory.getAllChildCategory)
//Tag
router.get('/tag', TagController.getAllTags)
//Product
router.get('/product/category/:id', [validateParams(AllSchema.id, 'id'), ProductModel.getProductByCategory])
router.get('/product/subCategory/:id', [validateParams(AllSchema.id, 'id'), ProductModel.getProductBySubCategory])
router.get('/product/childCategory/:id', [validateParams(AllSchema.id, 'id'), ProductModel.getProductByChildCategory])
//Product by Page
router.get('/product/:page', [ validateParams(AllSchema.page, 'page'), ProductModel.getAllProductByPage])
//Order
router.post('/order', [ validateToken(), OrderController.addOrder])
router.post('/order/user', [validateToken(), OrderController.getAllOrder])
//User Password
router.post('/password/', [validateToken(), UserController.passwordReset])

module.exports = router;