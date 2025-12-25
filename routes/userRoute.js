let router = require('express').Router();
let UserController = require('../controllers/userController');
let { validateBody } = require('../utils/validator');
let { UserSchema } = require('../utils/schema');


router.post('/register', [validateBody(UserSchema.register), UserController.registerUser])
router.post('/login', [validateBody(UserSchema.login), UserController.loginUser])

//Setting Role
router.post('/add/role',  [ validateBody(UserSchema.addRoleToUser),UserController.addRoleToUser])
router.post('/remove/role', [validateBody(UserSchema.addRoleToUser),UserController.removeRoleFromUser])

//Setting Permission
router.post('/add/permission',[validateBody(UserSchema.addPermissionToUser),UserController.addPermissionToUser])
router.post('/remove/permission', [validateBody(UserSchema.addPermissionToUser), UserController.removePermissionFromUser])

module.exports = router;