let router = require('express').Router();
let UserController = require('../controllers/userController');
let { validateBody } = require('../utils/validator');
let { UserSchema } = require('../utils/schema');


router.post('/register', [validateBody(UserSchema.register), UserController.registerUser])
router.post('/login', [validateBody(UserSchema.login), UserController.loginUser])

module.exports = router;