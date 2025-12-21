const router = require("express").Router();
const UserController = require("../controllers/userController");
const { validateBody } = require("../utils/validator");
const { UserSchema } = require("../utils/schema");

router.post('/register', validateBody(UserSchema.register), UserController.registerUser)
router.post('/login', validateBody(UserSchema.login) ,UserController.loginUser)

module.exports = router;