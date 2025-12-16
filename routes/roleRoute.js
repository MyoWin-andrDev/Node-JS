const router = require("express").Router();
const RoleController = require("../controllers/roleController");
const {validateBody , validateParams} = require("../utils/validator");
const { RoleSchema } = require("../utils/schema");

router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getSingleRole);
router.post('/', validateBody(RoleSchema.add) , RoleController.addRole);
router.patch('/:id', validateBody(RoleSchema.update), RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);
//Permission
router.post('/add/permit', RoleController.addPermission)
router.post('/remove/permit', RoleController.removePermission)

module.exports = router