const router = require('express').Router();
const ProductController = require('../controllers/productController');
const  { validateBody } = require('../utils/validator');
const { ProductSchema } = require('../utils/schema');

router.get('/', ProductController.getAllProduct)
router.post('/add/', validateBody(ProductSchema.addProduct), ProductController.addProduct);

module.exports = router;